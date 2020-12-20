const { observe } = require('../observer')

function setup (highlight) {
  if (document.location.href.includes('rohlik')) {
    observe('body', () => {
      highlight.matchText('.productCard__wrapper', 'h4')
      highlight.matchText('#productDetail > div', 'h2')
    })
  }
}

module.exports = {
  setup
}
