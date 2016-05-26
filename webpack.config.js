const webpack = require('webpack');

module.exports = {
  entry: {bundle:'./src/index.js'},
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
};