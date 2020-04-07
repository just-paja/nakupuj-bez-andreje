const fs = require("fs");
const os = require("os");
const path = require("path");
const rimraf = require("rimraf");

function getBabelConfig() {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current"
          }
        }
      ]
    ]
  };
}

function getIntegrationTestConfig(pack, path, extraConfig) {
  return {
    displayName: getSuiteName(pack, "integration"),
    name: getSuiteIdent(pack, "integration"),
    rootDir: path,
    roots: ["<rootDir>"],
    testPathIgnorePatterns: ["/build/", "/coverage/", "/node_modules/"],
    coveragePathIgnorePatterns: ["build", "debug"],
    transformIgnorePatterns: ["node_modules/(?!((jest-)/.*))"],
    setupFilesAfterEnv: ["jest-extended"],
    ...extraConfig
  };
}

function getLinterTestConfig(pack, path) {
  return {
    displayName: getSuiteName(pack, "linter"),
    name: getSuiteIdent(pack, "linter"),
    rootDir: path,
    runner: "jest-runner-eslint",
    testMatch: ["<rootDir>/**/*.{js,jsx}"],
    testPathIgnorePatterns: [
      "/build/",
      "/coverage/",
      "/node_modules/",
      "/static/"
    ]
  };
}

function getPackageTestConfig(path, projects, config = {}) {
  return {
    rootDir: path,
    projects,
    watchPlugins: [
      "jest-runner-eslint/watch-fix",
      "jest-watch-select-projects",
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ],
    ...config
  };
}

function getSuiteIdent(pack, specifier) {
  return `${pack.name}-${specifier}`;
}

function getSuiteName(pack, specifier) {
  return `${pack.name.replace("nakupuj-bez-andreje-", "")} ${specifier}`;
}

function setupJest() {
  const Enzyme = require("enzyme").default;
  const Adapter = require("enzyme-adapter-react-16").default;
  Enzyme.configure({ adapter: new Adapter() });
}

function setupMoment() {
  const moment = require("moment-timezone");
  moment.tz.setDefault("UTC");
}

module.exports = {
  getBabelConfig,
  getIntegrationTestConfig,
  getLinterTestConfig,
  getPackageTestConfig,
  setupJest,
  setupMoment
};
