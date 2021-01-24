function escapeRegexp (str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

const textPadding = '[\\s,()]'

function getPatternFromName (name) {
  return new RegExp(
    `(^|${textPadding})${escapeRegexp(name.toLowerCase())}($|${textPadding})`
  )
}

function matchBrand (patternList, str) {
  const clean = str
    .replace(/[\s]+/g, ' ')
    .trim()
    .toLowerCase()
  return patternList.find(brand => brand.pattern.test(clean)) || null
}

function createPatternList (brandList) {
  return brandList.reduce(
    (aggr, brand) =>
      aggr
        .concat([
          {
            companyRef: brand,
            company: brand.name,
            name: brand.brandName,
            pattern: getPatternFromName(brand.brandName)
          }
        ])
        .concat(
          brand.productNames.map(product => ({
            companyRef: brand,
            company: brand.name,
            name: product,
            pattern: getPatternFromName(product)
          }))
        ),
    []
  )
}

module.exports = {
  createPatternList,
  getPatternFromName,
  matchBrand
}
