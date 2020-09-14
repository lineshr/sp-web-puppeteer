
module.exports = class IntegrationFields {
    client_name;
    description;
    redirect_uris;
    post_logout_redirect_uris;
    frontchannel_logout_uri;
    client_uri;
    client_orgno;

    constructor(data) {
        if (typeof data === "undefined") {
            return;
        }
        this.client_name = data.client_name;
        this.description = data.description;
        this.redirect_uris = data.redirect_uris;
        this.post_logout_redirect_uris = data.post_logout_redirect_uris;
        this.frontchannel_logout_uri = data.frontchannel_logout_uri;
        this.client_uri = data.client_uri;
        this.client_orgno = data.client_orgno;
    }
};
