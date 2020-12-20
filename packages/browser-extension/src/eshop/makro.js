const agrofert = require('agrofert-list')

const { createPatternList, matchBrand } = require('agrofert-list/matcher')
const { observer } = require('../observer')

const brandList = createPatternList(agrofert)
const cacheKey = 'nakupujBezAndreje'

function getCache () {
  try {
    return JSON.parse(window.localStorage.getItem(cacheKey)) || {}
  } catch (e) {
    return {}
  }
}

function getCachedProductCompany (productId) {
  const cache = getCache()
  if (productId in cache) {
    return (
      brandList.find(brand => brand.companyRef.id === cache[productId]) || null
    )
  }
  return false
}

function storeProduct (productId, brand) {
  const cache = getCache()
  if (brand) {
    cache[productId] = brand.companyRef.id
  } else {
    cache[productId] = null
  }
  window.localStorage.setItem(cacheKey, JSON.stringify(cache))
}

function setup () {
  if (document.location.href.includes('makro.cz')) {
    function replaceMakroProductDetail (node) {
      const brand = matchBrand(node.textContent)
      if (brand) {
        const target = node.parentNode.querySelector('.product-incart')
        if (target) {
          replaceElementImages(target, brand)
        }
      }
      return brand
    }

    async function requestProductBrand (linkHref) {
      const cachedCompany = getCachedProductCompany(linkHref)
      if (cachedCompany !== false) {
        return cachedCompany
      }
      const res = await window.fetch(linkHref)
      if (!res.ok) {
        return null
      }
      const doc = document.createElement('html')
      doc.innerHTML = await res.text()
      const detail = doc.querySelector('.mo-detail + .accordion')
      if (!detail) {
        return null
      }
      const detailBrand = replaceMakroProductDetail(detail)
      doc.innerHTML = null
      storeProduct(linkHref, detailBrand)
      return detailBrand
    }

    async function replaceMakroListItem (node) {
      const replacedBrand = replaceByTextContent(node)
      if (replacedBrand) {
        return
      }
      const link = node.querySelector('a.product-photo')
      if (!link) {
        return
      }
      const detailBrand = await requestProductBrand(link.href)
      if (detailBrand) {
        replaceElementImages(node, detailBrand)
      }
    }

    observe('section.mo-content', () => {
      observe('.mo-products .product-incart', replaceMakroListItem)
      observe('.mo-detail + .accordion', replaceMakroProductDetail)
    })
  }
}

module.exports = {
  setup
}
