const mainIcon = 'web-bez-andreje.png'

function getReplacementUrl () {
  if (typeof chrome !== 'undefined') {
    return global.chrome.extension.getURL(mainIcon)
  }
  if (typeof safari !== 'undefined') {
    return `${global.safari.extension.baseURI}${mainIcon}`
  }
  return mainIcon
}

const replacementImageUrl = getReplacementUrl()

function replaceImages (node, matchingBrand) {
  const images = node.querySelectorAll('img')
  for (const image of images) {
    if (image.src !== replacementImageUrl) {
      image.src = replacementImageUrl
    }
    if (image.srcset) {
      image.removeAttribute('srcset')
    }
  }
}

module.exports = {
  replaceImages
}
