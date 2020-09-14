
module.exports = class ScopeFields {
    subscope;
    description;

    constructor(data) {
        if (typeof data === "undefined") {
            return;
        }
        this.subscope = data.subscope;
        this.description = data.description;
    }
};