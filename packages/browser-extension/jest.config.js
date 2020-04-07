const pack = require("./package");

const { resolve } = require("path");
const {
  getIntegrationTestConfig,
  getLinterTestConfig,
  getPackageTestConfig,
} = require("../../dev");

const eslint = getLinterTestConfig(pack, __dirname);
const integration = getIntegrationTestConfig(pack, __dirname);

process.env.NODE_PATH = resolve(__dirname, "..");

module.exports = getPackageTestConfig(__dirname, [integration, eslint]);
