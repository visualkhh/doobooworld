export const environment = {
    production: false,
    apiHost: 'http://localhost:4200',
    apiPrefix: '/assets/api',

    get apiHostUrl() {
        return this.apiHost + this.apiPrefix;
    }
};
