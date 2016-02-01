import {bootstrap} from 'angular2-universal-preview';
//import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

import {CookieThing, AuthUser} from './cookiething';

import {App} from './components/app';

export function main() {
  return bootstrap(App, [
    // These are dependencies of our App
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ELEMENT_PROBE_PROVIDERS,
    provide(AuthUser, {
        useFactory: () => {
            return new AuthUser().getUser(C("auth_token"));
        }
    }),
    provide(CookieThing, {
        useFactory: () => {
            return new CookieThing({});
        }
    }),
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps: [Http]
    })
  ])
  .catch(err => console.error(err));
}

export function C(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]}


document.addEventListener('DOMContentLoaded', main);