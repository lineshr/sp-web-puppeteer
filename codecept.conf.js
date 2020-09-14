require('dotenv').config();

const { setSharedCookies } = require('@codeceptjs/configure');
setSharedCookies(); // share cookies between browser helpers and REST helper

exports.config = {
  tests: './src/tests/*_test.js',
  output: './output',
  timeout: 20000,
  helpers: {
    Puppeteer: {
      url: process.env.SP_WEB_HOST,
      waitForNavigation:  ["networkidle0", "domcontentloaded"],
      // waitForNavigation:  "networkidle0",
      waitForAction: 100,
      waitForTimeout: 20000,
      getPageTimeout: 20000,
      windowSize: "1200x900",
      show: (process.env.SP_WEB_SHOW_GUI === "true"),
      chrome:{
        args: ['--disable-features=IsolateOrigins,site-per-process', '--disable-site-per-process', '--disable-web-security'],
        ignoreHTTPSErrors: true
      },
      pressKeyDelay: 5
    },
    REST: {
      endpoint: process.env.SP_WEB_HOST + '/api',
    },
    AssertWrapper : {
      require: "codeceptjs-assert"
    },
    BankIdHelper: {
      require: './src/helpers/bankid_helper.js',
    },
  },
  
  mocha: {
    reporterOptions: {
      'mocha-junit-reporter': {
        stdout: './output/console.log',
        options: {
          mochaFile: './output/result.xml',
          testsuitesTitle: 'CodeceptJS Tests',
          attachments: true
        },
        attachments: true //add screenshot for a failed test
      },
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true,
        },
      },
    },
    stepByStepReport: {
      enabled: true,
      deleteSuccessful: true,
      screenshotsForAllureReport: true
    }
  },
 
  
  include: {
    I: './src/steps/steps_file.js',
    loginPage: './src/pages/loginPage.js',
    integrationListPage: './src/pages/integrationListPage.js',
    integrationPage: './src/pages/integrationPage.js',
    scopeListPage: './src/pages/scopeListPage.js',
    scopePage: './src/pages/scopePage.js',
  },
  bootstrap: null,
  name: 'webdriverpuppeteer'
};
