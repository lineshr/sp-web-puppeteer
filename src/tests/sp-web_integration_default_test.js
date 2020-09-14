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

    await integrationPage.submitForm();
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
    await integrationPage.submitForm();
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
    await integrationPage.submitForm();
    integrationPage.deactivateClient();
});

Scenario('sp-web create client as supplier', async (I, integrationPage) => {

    // verify supplier permissions
    let permissions  = await I.sendGetRequest('/account/user-permissions');
    I.assertOk(permissions.status === 200, 'Could not get permissions: ' + permissions.statusText);
    I.assertOk(permissions.data.includes('idporten:dcr.supplier'), 'User must have supplier permission.');

    I.createNewIntegration();
    integrationPage.setIntegrationType('KRR', 'web');

    // supplier stuff
    let clientOrgno = '991825827';
    I.checkOption('#client_org_active');

    integrationPage.fillFields(new IntegrationFields({
        client_name: 'Supplier-KRR-' + await randomstring.generate({length: 8}),
        description: 'Supplier-KRR test',
        client_orgno: clientOrgno
    }));

    let clientId = await integrationPage.submitForm();

    // verify supplier & client orgno
    let account  = await I.sendGetRequest('/account');
    I.assertOk(account.status === 200, 'Could not get account: ' + account.statusText);
    I.assertOk(!!account.data && !!account.data.organizationNumber);
    let supplierOrgno = account.data.organizationNumber;

    let client = await I.sendGetRequest('/integrations/' + clientId);
    I.assertOk(client.status === 200, 'Could not get integration: ' + client.statusText);
    I.assertOk(client.data.supplier_orgno === supplierOrgno, 'supplier_orgno does not match.');
    I.assertOk(client.data.client_orgno === clientOrgno, 'client_orgno does not match.');

    // make a change and verify
    let client_name = await I.grabValueFrom('#client_name');
    let client_name_changed = client_name + ' changed';
    integrationPage.clickEdit();
    integrationPage.fillFields(new IntegrationFields({client_name: client_name_changed}));
    integrationPage.clickSave();
    let client_name_new = await I.grabValueFrom('#client_name');
    I.assertOk(client_name_new === client_name_changed, 'client_name was not changed.');

    integrationPage.deactivateClient();
});
