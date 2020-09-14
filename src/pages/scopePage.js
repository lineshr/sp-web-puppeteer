const { I } = inject();
const forOwn = require('lodash/forOwn');

module.exports = {

    submitForm(prefixName, subscopeName) {
        I.click('#submit-new-scope');
        I.waitForInvisible('.spinner-container');

        // verify client
        let scopeName = prefixName + ':' + subscopeName;
        I.seeInCurrentUrl('/scopes/' + scopeName);

        // verify client in table listing
        I.navigateToScopeList();
        I.seeTextEquals(scopeName, '//table[@id="scopes-table"]//a[@href="/scopes/' + scopeName + '"]');
        I.click('//table[@id="scopes-table"]//a[@href="/scopes/' + scopeName + '"]');
        I.waitForInvisible('.spinner-container');
    },

    fillFields(scopeFields) {
        forOwn(scopeFields, (value, key) => {
            if(!!value) {
                I.fillField('#' + key, value);
            }
        });
    },

    async selectNthPrefix(n) {
        let prefixName = await I.grabTextFrom('select#prefix option:nth-child(' + n + ')');
        I.assertOk(!!prefixName, 'Prefix dropdown is empty.');
        I.selectOption("select#prefix", prefixName); // select n-th available prefix
        return prefixName;
    },

    deactivateScope() {
        I.click('#change_button');
        I.waitForClickable('#deactivate_button');
        I.click('#deactivate_button');
        I.waitForVisible('body > div.fade.sp-web.modal.show > div');   // TODO: when new sp-web deployed:  I.waitForVisible('#deactivate-scope-modal');
        I.click('#deactivate_button');
        I.waitForInvisible('body > div.fade.sp-web.modal.show > div'); // TODO: when new sp-web deployed: I.waitForInvisible('#deactivate-scope-modal');
        I.waitForInvisible('.spinner-container');
        I.seeInCurrentUrl('/scopes');
    },


};
