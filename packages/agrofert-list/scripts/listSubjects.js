const fetch = require('node-fetch')
const cheerio = require('cheerio')

const { qsm, getUrlParams } = require('query-string-manipulator')

const listQueryUrl = 'https://or.justice.cz/ias/ui/rejstrik-$firma'
const listQueryParams = {
  'p::submit': 'x',
  './rejstrik-$firma': '',
  ico: '',
  obec: '',
  ulice: '',
  forma: '',
  oddil: '',
  vlozka: '',
  soud: '',
  polozek: '5',
  typHledani: 'EXACT',
  jenPlatne: 'PLATNE'
}

const detailQueryUrl = 'https://or.justice.cz/ias/ui/rejstrik-firma.vysledky'
const detailQueryParams = {
  typ: 'UPLNY'
}

const LAW_FORM_COMPANY_LIMITED = 'COMPANY_LIMITED'
const LAW_FORM_COMPANY_JOINT_STOCK = 'COMPANY_JOINT_STOCK'
const LAW_FORM_PARTNERSHIP_GENERAL = 'PARTNERSHIP_GENERAL'
const LAW_FORM_FOUNDATION = 'FOUNDATION'
const LAW_FORM_COOPERATIVE = 'COOPERATIVE'
const LAW_FORM_ENTREPRENEUR = 'ENTREPRENEUR'
const LAW_FORM_VOLUNTARY_ASSOCIATION = 'VOLUNTARY_ASSOCIATION'

const LAW_FORM_MAP = {
  'a\\. s\\.': LAW_FORM_COMPANY_JOINT_STOCK,
  'a\\.s\\.': LAW_FORM_COMPANY_JOINT_STOCK,
  'a\\.s': LAW_FORM_COMPANY_JOINT_STOCK,
  'akciová společnost': LAW_FORM_COMPANY_JOINT_STOCK,
  's\\. r\\. o\\.': LAW_FORM_COMPANY_LIMITED,
  's\\. r\\.o\\.': LAW_FORM_COMPANY_LIMITED,
  's\\.r\\. o\\.': LAW_FORM_COMPANY_LIMITED,
  's\\.r\\.o\\.': LAW_FORM_COMPANY_LIMITED,
  'spol\\. s r\\. o\\.': LAW_FORM_COMPANY_LIMITED,
  'spol\\. s r\\.o\\.': LAW_FORM_COMPANY_LIMITED,
  'společnost s ručením omezeným': LAW_FORM_COMPANY_LIMITED,
  'v\\. o\\. s\\.': LAW_FORM_PARTNERSHIP_GENERAL,
  'v\\. o\\.s\\.': LAW_FORM_PARTNERSHIP_GENERAL,
  'v\\.o\\. s\\.': LAW_FORM_PARTNERSHIP_GENERAL,
  'v\\.o\\.s\\.': LAW_FORM_PARTNERSHIP_GENERAL,
  Nadace: LAW_FORM_FOUNDATION,
  družstvo: LAW_FORM_COOPERATIVE,
  'Fyzická osoba - podnikatel': LAW_FORM_ENTREPRENEUR,
  Spolek: LAW_FORM_VOLUNTARY_ASSOCIATION
}

function filterUnique (item, index, src) {
  return src.indexOf(item) === index
}

function getValidLawForms () {
  return Object.values(LAW_FORM_MAP).filter(filterUnique)
}

function filterByText (query, root, text) {
  return root.filter(
    (item) =>
      query(item)
        .text()
        .trim() === text
  )
}

function parseLawForm (text) {
  return Object.entries(LAW_FORM_MAP).find(([pattern]) => {
    const lawFormTest = new RegExp(`${pattern}`, 'i')
    return lawFormTest.test(text)
  })
}

function parseResult (query, result) {
  const nameTh = filterByText(query, result.find('th'), 'Název subjektu:')
  const name = nameTh
    .next()
    .text()
    .trim()
  const idTh = filterByText(query, result.find('th'), 'IČO:')
  const id = idTh
    .next()
    .text()
    .trim()

  const lawFormResult = parseLawForm(name)
  let lawForm = null
  if (lawFormResult) {
    const [, lawFormId] = lawFormResult
    lawForm = lawFormId
  } else {
    const linkNode = filterByText(
      query,
      result.find('a'),
      'Úplný výpis'
    ).first()
    const linkParams = getUrlParams(linkNode.attr('href'))
    const subjektIdParam = linkParams.find(param => param.key === 'subjektId')
    const subjektId = subjektIdParam.value
    const detail = getSubjectDetail(subjektId)
    lawForm = detail.lawForm
  }
  return {
    name,
    id,
    lawForm
  }
}

async function getSubjectDetail (subjektId) {
  process.stderr.write(`detail, ${subjektId}\n`)
  const url = qsm(detailQueryUrl, {
    set: {
      ...detailQueryParams,
      subjektId: subjektId
    }
  })
  const res = await fetch(url)
  const query = cheerio.load(await res.text())
  const lawFormRoot = filterByText(
    query,
    query('.vr-hlavicka'),
    'Právní forma:'
  )
  const lawFormTh = lawFormRoot.parents('.div-cell')
  const lawFormText = lawFormTh.next().text()
  const lawFormResult = parseLawForm(lawFormText)
  if (!lawFormResult) {
    throw new Error(`Cannot determine law form for "${lawFormText}".`)
  }
  const [, lawForm] = lawFormResult

  return {
    // @TODO: Extract all details
    lawForm
  }
}

function escapeRegexp (str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function matchesName (company, name) {
  const companyName = company.name.replace(/["]/g, '')
  if (companyName === name) {
    return true
  }

  return Object.entries(LAW_FORM_MAP)
    .filter(([, form]) => form === company.lawForm)
    .map(([pattern]) => pattern)
    .some(pattern => {
      const regexStr = `${escapeRegexp(name)},?[\\s]+${pattern}`
      const regex = new RegExp(regexStr, 'i')
      return regex.test(companyName)
    })
}

async function listSubject (brandName) {
  process.stderr.write(`list, ${brandName}\n`)
  const url = qsm(listQueryUrl, {
    set: {
      ...listQueryParams,
      nazev: brandName
    }
  })
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  const query = cheerio.load(await res.text())

  const results = Array.prototype.map.call(
    query('.search-results ol > li'),
    item => parseResult(query, query(item))
  )
  const result = results.find(item => matchesName(item, brandName))
  if (!result) {
    throw new Error(`Could not find exact match for "${brandName}"`)
  }
  return {
    ...result,
    brandName
  }
}

async function promiseChunks (array, resolver) {
  let i
  const arraySize = array.length
  let data = []
  const chunkSize = 8
  for (i = 0; i < arraySize; i += chunkSize) {
    const items = array.slice(i, i + chunkSize)
    const chunkData = await Promise.all(items.map(item => resolver(item)))
    data = data.concat(chunkData)
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  return data
}

async function listSubjects (brandNames) {
  return await promiseChunks(brandNames, listSubject)
}

module.exports = {
  LAW_FORM_MAP,
  getValidLawForms,
  getSubjectDetail,
  listSubjects
}
