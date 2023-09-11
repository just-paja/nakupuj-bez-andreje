module.exports = {
  presets: [
    ['@babel/preset-env', { "loose": true }],
    '@babel/preset-react',
    'module:metro-react-native-babel-preset'
  ],
  plugins: [
    ["@babel/plugin-transform-private-methods", { "loose": true }]
  ]
}
