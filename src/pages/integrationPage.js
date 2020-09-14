const { I } = inject();
const forOwn = require('lodash/forOwn');

module.exports = {

    // setting locators
    // fields: {
    //     email: '#user_basic_email',
    //     password: '#user_basic_password'
    // },
    // submitButton: {css: '#new_user_basic input[type=submit]'},

    async submitForm() {
        // submit form
        I.click('#submit-new-integration');
        I.waitForNavigation();

        // verify client
        I.seeElement("#confirm-modal");
        let clientId = (await I.grabTextFrom('#modal-client-id')).split('client_id: ')[0];
        I.seeInCurrentUrl('/integrations/' + clientId);
        I.click("#close_button");

        // verify client in table listing
        I.navigateToIntegrationList();
        I.seeTextEquals(clientId, '//a[@href="/integrations/' + clientId + '"]');
        I.click('//a[@href="/integrations/' + clientId + '"]');
        I.waitForInvisible('.spinner-container');

        return clientId;
    },

    deactivateClient() {
        I.click('#change-integration');
        I.waitForClickable('#deactivate-integration');
        I.click('#deactivate-integration');
        I.waitForVisible('#deactivate-confirm-modal');
        I.click('#deactivate_button');
        I.waitForInvisible('#deactivate-confirm-modal');
        I.waitForInvisible('.spinner-container');
        I.seeInCurrentUrl('/integrations');
    },

    setIntegrationType(integration_type, application_type) {
        I.selectOption("select#difi-service", integration_type);
        I.selectOption("select#difi-application", application_type);
    },

    fillFields(integrationFields) {
        forOwn(integrationFields, (value, key) => {
            if(!!value) {
                I.fillField('#' + key, value);
            }
        });
    },

    addNthScope(n) {
        I.waitForClickable('#add-scopes');
        I.click('#add-scopes');
        I.waitForVisible('#add-scopes-modal');
        I.see('Tilgjengelige scopes');
        I.seeElement('#scope-' + n);
        I.checkOption('#scope-' + n);
        I.click('#close_button');
        I.waitForInvisible('#add-scopes-modal');
    },

    clickEdit() {
        I.click('#change-integration');
        I.waitForEnabled("#client_name");
    },

    clickSave() {
        I.click('#save-integration');
        I.waitForInvisible('.spinner-container');
    },
};
