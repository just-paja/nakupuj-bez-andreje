const mainIcon = 'web-bez-andreje.png'

function getTitle (brand) {
  return `Product blacklisted because it matches: '${brand.name}' of '${brand.company}'`
}

function reduceOpacity (node, matchingBrand) {
  node.style.opacity = 0.2
  const matchTitle = getTitle(matchingBrand)
  if (node.title !== matchTitle) {
    node.title = matchTitle
  }
}

module.exports = {
  reduceOpacity
}
