exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url :'https://sp-web-test-test1.azurewebsites.net/',
      chrome:{
        args: ['--no-sandbox']
      }
    }
  },
 mocha: {
    reporterOptions: {
      'mocha-junit-reporter': {
        stdout: './reports/console.log',
        options: {
          mochaFile: './output/result.xml',
          testsuitesTitle: 'CodeceptJS Tests',
        },
        "attachments": true //add screenshot for a failed test
      },
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          steps: true,
        },
      },
    },
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'webdriverpuppeteer'
}
