import {provide} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

export const APPLICATION_PROVIDERS = [
    ...FORM_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...JSONP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
];

export const PROVIDERS = [
    ...APPLICATION_PROVIDERS
];