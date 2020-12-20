const { observe } = require('../observer')
const { replaceImages } = require('./replaceImages')
const { matchBlacklistedBrand } = require('./brands')

function matchElementText (contentNode) {
  return matchBlacklistedBrand(contentNode.textContent)
}

function createHighlighter (config) {
  function highlight (node, brand) {
    if (config.replaceWithLogo) {
      replaceImages(node, brand)
    }
  }

  function matchAndHighlight (containerNode, contentNode) {
    const source = contentNode || containerNode
    const brand = matchElementText(source)
    if (brand) {
      highlight(containerNode, brand)
    }
  }

  function matchText (containerSelector, contentSelector) {
    observe(containerSelector, containerNode => {
      if (contentSelector) {
        Array.prototype.map.call(
          containerNode.querySelectorAll(contentSelector),
          contentNode => {
            matchAndHighlight(containerNode, contentNode)
          }
        )
      } else {
        matchAndHighlight(containerNode)
      }
    })
  }
  return {
    matchText
  }
}

module.exports = { createHighlighter }
