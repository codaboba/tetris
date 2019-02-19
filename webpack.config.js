const path = require('path')

module.exports = {
  entry: ['./src/setup.js', './src/app.js'],
  output: {
    path: __dirname,
    filename: './src/bundle.js'
  },
  mode: 'development',
  resolve: {
    alias: {
      'https://unpkg.com/chai@4.1.2/chai.js': 'chai/chai.js'
    }
  },
  module: {
    rules: [
      {
        test: require.resolve('chai/chai.js'),
        use: 'script-loader'
      }
    ]
  },
};
