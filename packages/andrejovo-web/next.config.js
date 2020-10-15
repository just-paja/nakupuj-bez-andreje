const withSass = require("@zeit/next-sass");

module.exports = withSass({
  publicRuntimeConfig: {
    GTM_CODE: process.env.GTM_CODE || null
  }
});
