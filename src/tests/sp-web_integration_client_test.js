const IntegrationFields = require("../domain/IntegrationFields");
const randomstring = require("randomstring");

Feature('sp-web default client test');

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

Scenario('sp-web create clients with default values', async (I, integrationPage) => {

    /********************************************************
     * Maskinporten client
     ********************************************************/
    I.createNewIntegration();
    integrationPage.setIntegrationType('Maskinporten', 'web');
    integrationPage.addNthScope(1);
    integrationPage.fillFields(new IntegrationFields({
        client_name: 'Maskinporten-' + await randomstring.generate({length: 8}),
        description: 'maskinporten test'
    }));
    //let clientName = client_name;
    let clientId = await integrationPage.submitForm('maskinporten');
    integrationPage.deactivateClient();

    /********************************************************
     * ID-Porten client
     ********************************************************/
    I.createNewIntegration();
    integrationPage.setIntegrationType('ID-porten', 'web');
    integrationPage.fillFields(new IntegrationFields({
        client_name: 'ID-Porten-' + await randomstring.generate({length: 8}),
        description: 'idporten test',
        redirect_uris: 'https://so.me/where',
        post_logout_redirect_uris: 'https://so.me/where, https://some.where/else',
        frontchannel_logout_uri: 'no.digdir.mobileApp://oauth2Callback',
        client_uri: 'http://localhost:8080/auth/login'
    }));
    await integrationPage.submitForm('idporten');
    integrationPage.deactivateClient();

    /********************************************************
     * KRR client
     ********************************************************/
    I.createNewIntegration();
    integrationPage.setIntegrationType('KRR', 'web');
    integrationPage.fillFields(new IntegrationFields({
        client_name: 'KRR-' + await randomstring.generate({length: 8}),
        description: 'KRR test'
    }));
    await integrationPage.submitForm('krr');
    integrationPage.deactivateClient();
});
