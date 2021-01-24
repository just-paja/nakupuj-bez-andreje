import agrofertList from 'agrofert-list'

const companies = agrofertList.filter(company => Boolean(company.barcodePrefix))

export function findMatch (code) {
  return companies.find(company => code.startsWith(company.barcodePrefix))
}
