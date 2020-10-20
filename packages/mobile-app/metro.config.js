const path = require('path')

module.exports = {
  watchFolders: [path.resolve(__dirname, '../../node_modules')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
