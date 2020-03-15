const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { qsm } = require('query-string-manipulator');

const listQueryUrl = 'https://or.justice.cz/ias/ui/rejstrik-$firma'
const listQueryParams = {
  'p::submit': 'x',
  './rejstrik-$firma': '',
  'ico': '',
  'obec': '',
  'ulice': '',
  'forma': '',
  'oddil': '',
  'vlozka': '',
  'soud': '',
  'polozek': '1',
  'typHledani': 'EXACT',
  'jenPlatne': 'PLATNE',
}

const detailQueryUrl = 'https://or.justice.cz/ias/ui/rejstrik-firma.vysledky'
const detailQueryParams = {
  typ: 'UPLNY',
}

const LAW_FORM_COMPANY_LIMITED = 'COMPANY_LIMITED';
const LAW_FORM_COMPANY_JOINT_STOCK = 'COMPANY_JOINT_STOCK';
const LAW_FORM_PARTNERSHIP_GENERAL = 'PARTNERSHIP_GENERAL';
const LAW_FORM_FOUNDATION = 'FOUNDATION';
const LAW_FORM_COOPERATIVE = 'COOPERATIVE';
const LAW_FORM_ENTREPRENEUR = 'ENTREPRENEUR';

const LAW_FORM_MAP = {
  'a. s.': LAW_FORM_COMPANY_JOINT_STOCK,
  'a.s.': LAW_FORM_COMPANY_JOINT_STOCK,
  'a.s': LAW_FORM_COMPANY_JOINT_STOCK,
  's. r. o.': LAW_FORM_COMPANY_LIMITED,
  's.r.o.': LAW_FORM_COMPANY_LIMITED,
  'v. o. s.': LAW_FORM_PARTNERSHIP_GENERAL,
  'v.o.s.': LAW_FORM_PARTNERSHIP_GENERAL,
  'Nadace': LAW_FORM_FOUNDATION,
  'družstvo': LAW_FORM_COOPERATIVE,
  'Fyzická osoba - podnikatel': LAW_FORM_ENTREPRENEUR,
}

function filterUnique(item, index, src) {
  return src.indexOf(item) === index;
}

function getValidLawForms() {
  return Object.values(LAW_FORM_MAP).filter(filterUnique);
}

function filterByText(query, root, text) {
  return root.filter((index, item) => query(item).text().trim() === text);
}

function parseLawForm(text) {
  return Object.entries(LAW_FORM_MAP).find(([pattern, form]) => {
    const lawFormTest = new RegExp(`${pattern}`, 'i');
    return lawFormTest.test(text);
  });
}

function parseResult(query, result) {
  const nameTh = filterByText(query, result.find('th'), 'Název subjektu:');
  const name = nameTh.next().text().trim();
  const idTh = filterByText(query, result.find('th'), 'IČO:');
  const id = idTh.next().text().trim();

  const lawFormResult = parseLawForm(name);
  let lawForm = null;
  if (lawFormResult) {
    const [,lawFormId] = lawFormResult;
    lawForm = lawFormId;
  } else {
    const detail = getSubjectDetail(id)
    lawForm = detail.lawForm;
  }
  return {
    name,
    id,
    lawForm,
  }
}

async function getSubjectDetail(id) {
  const url = qsm(detailQueryUrl, {
    set: {
      ...detailQueryParams,
      subjektId: id,
    }
  });
  const res = await fetch(url);
  const query = cheerio.load(await res.text());
  const lawFormRoot = filterByText(query, query('.vr-hlavicka'), 'Právní forma:');
  const lawFormTh = lawFormRoot.parents('.div-cell');
  const lawFormText = lawFormTh.next().text();
  const lawFormResult = parseLawForm(lawFormText);
  if (!lawFormResult) {
    throw new Error(`Cannot determine law form for "${lawFormText}".`);
  }
  const [,lawForm] = lawFormResult;

  return {
    // @TODO: Extract all details
    id,
    lawForm,
  }
}

async function listSubject(name) {
  const url = qsm(listQueryUrl, {
    set: {
      ...listQueryParams,
      nazev: name,
    }
  });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const query = cheerio.load(await res.text());

  const firstItem = query('.search-results ol > li').first();
  return parseResult(query, query(firstItem));
}

async function promiseChunks(array, resolver) {
  let i;
  let arraySize = array.length;
  let data = [];
  let chunkSize = 8;
  for (i=0; i < arraySize; i += chunkSize) {
    const items = array.slice(i, i + chunkSize);
    const chunkData = await Promise.all(items.map(item => resolver(item)));
    data = data.concat(chunkData);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return data;
}

async function listSubjects(subjectList) {
  return await promiseChunks(subjectList, listSubject);
}

module.exports = {
  LAW_FORM_MAP,
  getValidLawForms,
  getSubjectDetail,
  listSubjects,
}
