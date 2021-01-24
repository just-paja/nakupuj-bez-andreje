const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, '..', '..', 'node_modules')]
  },
  publicRuntimeConfig: {
    GTM_CODE: process.env.GTM_CODE || null
  }
}
