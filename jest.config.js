const { guessRootConfig } = require('lerna-jest')

process.env.NODE_PATH = require('path').join(__dirname, 'packages')
module.exports = guessRootConfig(__dirname)

module.exports.projects[6].transformIgnorePatterns = [
  'node_modules/(?!((jest-)?react-native-|rn-/.*))'
]
