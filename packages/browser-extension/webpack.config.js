const path = require('path')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
    popup: path.join(__dirname, 'src', 'popup.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'package')
  }
}
