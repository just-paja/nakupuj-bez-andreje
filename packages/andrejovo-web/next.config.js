const withSass = require("@zeit/next-sass");

module.exports = withSass({
  publicRuntimeConfig: {
    GTM_CODE: process.env.NODE_GTM_CODE || null
  }
});
