var webpackConfig = require('./webpack.test');

module.exports = function configureKarma(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'specs.webpack.js'
    ],

    preprocessors: {
      'specs.webpack.js': ['webpack', 'sourcemap'] // TODO Add sourcemap,
    },

    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    webpack: webpackConfig,

    /** Hide webpack build information from output */
    webpackMiddleware: {
      noInfo: 'errors-only'
    },

    webpackServer: {
      noInfo: true,
      quiet: true
    },

    coverageReporter: {
      dir: '../coverage/',
      reporters: [
        {
          type: 'html',
          subdir: 'html'
        }, {
          type: 'lcov',
          subdir: 'lcov'
        }
      ]
    },

    autoWatch: false,
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    singleRun: true,
    colors: true,
    port: 9876
  });
};
