var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');

// const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.resolve('./build'),
    publicPath: 'http://dustinweaver.com/jobs/remote/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  //htmlLoader: {
  //  minimize: false
  //},

  plugins: [
    // This plugin will cause the build to fail if any errors
    // are thrown. Useful primarily on production builds.
    new webpack.NoErrorsPlugin(),

    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200 // ~50kb
    }),

    new webpack.optimize.UglifyJsPlugin({
      mangle: true
    }),

    new ExtractTextPlugin('[name].[hash].css')

    //new webpack.DefinePlugin({
    //  'process.env': {
    //    'ENV': JSON.stringify(ENV)
    //  }
    //})
  ]
});
