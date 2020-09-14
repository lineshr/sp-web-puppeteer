const ScopeFields = require("../domain/ScopeFields");
const randomstring = require("randomstring");

Feature('sp-web default scope test');

Before(async (I) => {
    // start & login
    I.amOnPage(process.env.SP_WEB_HOST + '/');
    I.loginWithMidifi(process.env.SP_WEB_MIDIFI_USERNAME, process.env.SP_WEB_MIDIFI_PASSWORD);

    // sanity check
    I.checkEnvironmentAndFirstPage();
});

After(async (I) => {
    I.logout();
});


Scenario('sp-web create scope with default values', async (I, scopePage) => {
    I.createNewScope();
    let prefixName = await scopePage.selectNthPrefix(1);
    let subscopeName = 'testscope/' + await randomstring.generate({length: 8, charset: 'alphanumeric', capitalization: 'lowercase'});
    scopePage.fillFields(new ScopeFields({
        subscope: subscopeName,
        description: "scope test"
    }));
    scopePage.submitForm(prefixName, subscopeName);
    scopePage.deactivateScope();
});