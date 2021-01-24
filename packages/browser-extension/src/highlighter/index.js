const { matchBlacklistedBrand } = require('./brands')
const { observe } = require('../observer')
const { reduceOpacity } = require('./reduceOpacity')
const { replaceImages } = require('./replaceImages')
const { colorMark } = require('./colorMark')

function matchElementText (contentNode) {
  return matchBlacklistedBrand(contentNode.textContent)
}

function createHighlighter (config) {
  function highlight (node, brand) {
    if (config.replaceWithLogo) {
      replaceImages(node, brand)
    }
    if (config.reduceOpacity) {
      reduceOpacity(node, brand)
    }
    if (config.colorMark) {
      colorMark(node, brand)
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
    highlight,
    matchText
  }
}

module.exports = { createHighlighter }
