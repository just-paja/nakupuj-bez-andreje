const { observe } = require('../observer')

function setup (highlight) {
  if (document.location.href.includes('itesco')) {
    observe('body', () => {
      highlight.matchText('.product-tile')
      highlight.matchText('.product-details-tile')
      highlight.matchText('.mini-tile')
    })
  }
}

module.exports = {
  setup
}
