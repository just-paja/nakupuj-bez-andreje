const agrofert = require('agrofert-list')

const { createPatternList, matchBrand } = require('agrofert-list/matcher')

const brandList = createPatternList(agrofert)

function matchBlacklistedBrand (text) {
  return matchBrand(brandList, text)
}

module.exports = {
  matchBlacklistedBrand
}
