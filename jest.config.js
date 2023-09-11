import { guessRootConfig } from '@optimics/jest'

export default guessRootConfig(import.meta.url)

/*
module.exports.projects[6].transformIgnorePatterns = [
  'node_modules/(?!((jest-)?react-native-|rn-/.*))'
]
*/
