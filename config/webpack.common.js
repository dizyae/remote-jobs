// This is the common configuration that is shared between
// the test, dev, and production configurations
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // Sequence might (?) matter here
    vendor: path.resolve('app/vendor.js'),
    main: path.resolve('app/main.js')
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint!jscs'
    }],
    loaders: [{
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
    }, {
      test: /\.js$/,
      exclude: /(node_modules|\.spec\.js$|app\/mocks)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      // The complex '\?v=', etc., is added for font-awesome's file names
      test: /\.(png|jpe?g|ico|gif|(svg|ttf|eot|woff(2)?)(\?v=\d+\.\d+\.\d+)?)$/i,
      loader: 'url',
      query: {
        name: 'assets/[name].[hash].[ext]',
        // If the file is smaller than 10kb, inline it with url-loader
        // as a data URI. If not, fall back to the file-loader to load
        // the file as-is.
        limit: 10000
      }
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
      loaders: [
        'transform-loader/cacheable?brfs',
        'transform-loader/cacheable?packageify'
      ]
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
      loader: 'transform-loader/cacheable?ejsify'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor']
    }),

    new CopyWebpackPlugin([{
      from: 'app/.htaccess'
    }]),

    // HtmlWebpackPlugin injects scripts & links into index.html
    // so that we don't have to do so manually
    new HtmlWebpackPlugin({
      template: './app/index.html'
      // showErrors: true TODO: In prod, set this to false. The default is true
    })
  ],

  resolve: {
    // allows '.js' and '.ts' to be dropped from import statements
    extensions: ['', '.js', '.ts'],
    // files in these directory can be required without a relative path
    modulesDirectories: [
      'node_modules'
    ]
  }
};
