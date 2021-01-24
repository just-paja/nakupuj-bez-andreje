const withSass = require('@zeit/next-sass')

module.exports = withSass({
  publicRuntimeConfig: {
    GTM_CODE: process.env.GTM_CODE || null
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /__tests__/,
      loader: 'ignore-loader'
    })
    return config
  }
})
