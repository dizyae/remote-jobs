var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  entry: {},

  output: {},

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      // Exclude Jasmine specs because Karma will load them
      exclude: /(node_modules|\.spec\.js$)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'null'
    }, {
      test: /\.css$/,
      loader: 'null'
    }],
    postLoaders: [{
      test: /\.js$/,
      exclude: /(node_modules|\.spec\.js$|config)/,
      loader: 'babel-istanbul-loader'
    },{
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
    new webpack.ProvidePlugin({
      'window.Auth0Lock': 'auth0-lock'
    })
  ]

};
