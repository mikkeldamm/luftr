import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, JSONP_PROVIDERS, Http} from 'angular2/http';

//import {AuthHttp, AuthConfig} from 'angular2-jwt';

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

import {App} from './app/app';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(App, [
        ...ENV_PROVIDERS,
        ...HTTP_PROVIDERS,
        ...JSONP_PROVIDERS,
        ...ROUTER_PROVIDERS
        /*,
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
        })
        */
    ])
    .catch(err => console.error(err));
});