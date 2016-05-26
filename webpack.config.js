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
    }, {
      test: /\.html$/,
      loader: "file?name=[name].[ext]",
    }]
  },
  devServer: {
      inline: true,
      progress: true,
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
};