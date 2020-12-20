const eshops = [
  require('./kosik'),
  require('./makro'),
  require('./rohlik'),
  require('./tesco')
]

function createEshop (highlight) {
  eshops.map(eshop => eshop.setup(highlight))
}

module.exports = { createEshop }
