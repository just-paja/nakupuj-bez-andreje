const { createEshop } = require('./eshop')
const { clearObservers } = require('./observer')
const { createHighlighter } = require('./highlighter')

async function setupExtension (config) {
  createEshop(createHighlighter(config))
  return clearObservers
}

module.exports = {
  setupExtension
}
