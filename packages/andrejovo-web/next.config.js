const withSass = require("@zeit/next-sass");

module.exports = withSass({
  publicRuntimeConfig: {
    GA_CODE: process.env.NODE_GA_CODE || null
  }
});
