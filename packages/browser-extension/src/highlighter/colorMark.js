function getTitle (brand) {
  return `Product blacklisted because it matches: '${brand.name}' of '${brand.company}'`
}

function colorMark (node, matchingBrand) {
  const descendants = node.querySelectorAll('*')
  const red = '#f00'
  node.style.color = red
  for (const descendant of descendants) {
    descendant.style.color = red
  }
  const matchTitle = getTitle(matchingBrand)
  if (node.title !== matchTitle) {
    node.title = matchTitle
  }
}

module.exports = {
  colorMark
}
