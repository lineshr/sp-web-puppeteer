
module.exports = function() {
  return actor({

    loginWithMidifi: function (username, password) {
      this.see('Logg inn til Samarbeidsportalen');
      this.click('#login-button');
      this.fillField('username', username);
      this.fillField('password', password);
      this.click('login');
      this.waitForNavigation();
    },

    loginWithIdPorten: function (username, password, otp) {
      this.see('Logg inn med ID-Porten');
      this.click('Logg inn med ID-Porten');
      this.waitForNavigation();
      this.loginWithBankId();
      this.waitForNavigation();
    },

    logout: function (host = process.env.SP_WEB_HOST) {
      this.amOnPage(host + '/');
      this.click('#logout');
      this.waitForNavigation();
    },

    checkEnvironmentAndFirstPage: function () {
      this.seeInCurrentUrl('/');
      this.seeInTitle("Administrasjon av tjenester | Samarbeidsportalen");
      this.see(process.env.SP_WEB_ENV, '#env-badge');
    },

    navigateToIntegrationList: function () {
      this.click('button#env-badge');
      this.waitForInvisible('.spinner-container');
      this.click('#integrations-link');
      this.waitForInvisible('.spinner-container');
      this.seeElement("#integrations-table");
    },

    navigateToScopeList: function () {
      this.click('button#env-badge');
      this.waitForInvisible('.spinner-container');
      this.click('#scopes-link');
      this.waitForInvisible('.spinner-container');
      this.seeElement("#scopes-table");
    },

    createNewIntegration: function () {
      this.navigateToIntegrationList();
      this.click('#new-integration');
      this.waitForInvisible('.spinner-container');
    },

    createNewScope: function () {
      this.navigateToScopeList();
      this.click('#new-scope');
      this.waitForInvisible('.spinner-container');
    },


  });
};
