// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    files: [{
      pattern: './src/test.ts',
      watched: false
    }, {
      pattern: './src/styles.spec.css'
    }, {
      pattern: './node_modules/hammerjs/hammer.js'
    }, {
      pattern: './node_modules/font-awesome/css/font-awesome.css'
    }, {
      pattern: './node_modules/@swimlane/ngx-datatable/release/index.css'
    }, {
      pattern: './node_modules/@swimlane/ngx-datatable/release/themes/material.css'
    }, {
      pattern: './node_modules/bootstrap/dist/css/bootstrap.css'
    }, {
      pattern: './node_modules/@swimlane/ngx-datatable/release/assets/icons.css'
    }],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [(process.env.TRAVIS) ? 'HeadlessChromeTravisCi' : 'HeadlessChrome'], // 'ChromeHeadless', 'MyHeadlessChrome'
    singleRun: false,
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      HeadlessChromeTravisCi: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-translate', '--disable-extensions', '--remote-debugging-port=9223']
      },
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--disable-extensions', '--remote-debugging-port=9223']
      }
    },
    browserNoActivityTimeout: 90000
  });
};
