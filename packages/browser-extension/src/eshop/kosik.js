const { observe } = require('../observer')

function setup (highlight) {
  if (document.location.href.includes('kosik')) {
    observe('body', () => {
      highlight.matchText("[data-tid='product-box']")
      highlight.matchText('[data-product-id]')
      highlight.matchText('.product-list-search')
      highlight.matchText('.product-detail .product-detail__row')
      highlight.matchText('.product-item')
      highlight.matchText('.basket__product__wrapper')
    })
  }
}

module.exports = {
  setup
}
