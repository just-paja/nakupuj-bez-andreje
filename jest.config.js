const {getPackageTestConfig} = require('./dev');

const agrofertList = require('./packages/agrofert-list/jest.config');
const browserExtension = require('./packages/browser-extension/jest.config');

const config = {
  collectCoverageFrom: [
    '**/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/*.config.js',
    '!<rootDir>/build-android.js',
  ],
};

module.exports = getPackageTestConfig(
  __dirname,
  [
    ...agrofertList.projects,
    ...browserExtension.projects,
  ],
  config,
);
