const { getPackageTestConfig } = require("./dev");

const agrofertList = require("./packages/agrofert-list/jest.config");
const andrejovoWeb = require("./packages/andrejovo-web/jest.config");
const browserExtension = require("./packages/browser-extension/jest.config");

const config = {
  collectCoverageFrom: [
    "**/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/*.config.js",
    "!<rootDir>/build-android.js"
  ]
};

module.exports = getPackageTestConfig(
  __dirname,
  [
    ...andrejovoWeb.projects,
    ...agrofertList.projects,
    ...browserExtension.projects
  ],
  config
);
