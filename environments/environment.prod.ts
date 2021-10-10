export const environment = {
    production: true,
    apiHost: 'http://localhost:4200',
    apiPrefix: '/assets/api',

    get apiHostUrl() {
        return this.apiHost + this.apiPrefix;
    }
};
