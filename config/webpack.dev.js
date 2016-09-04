var commonConfig = require('./webpack.common.js');
var path = require('path');
var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  // per Google's suggestion: https://angular.io/docs/ts/latest/guide/webpack.html#!#test-configuration
  devtool: 'cheap-module-eval-source-map',

  output: {
    // The dev server keeps the dev build in memory rather than writing it to disk
    path: path.resolve('./build'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ],

  devServer: {
    historyApiFallback: true,
    // Unlike the cli flag, this doesn't set
    // HotModuleReplacementPlugin!
    hot: true,
    inline: true,
    stats: 'minimal',
    host: 'localhost',
    port: 8007
  }
});
