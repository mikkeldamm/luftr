import { bootstrap } from '@angular/platform-browser-dynamic';

import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';

import { App, APP_PROVIDERS } from './app';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(App, [
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS,
    ...FIREBASE_PROVIDERS,
    defaultFirebase('https://luftr-1236.firebaseio.com')
  ]).catch(err => console.error(err));
}


if (ENV === 'development' && HMR === true) {
  
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
    
} else {
  
    document.addEventListener('DOMContentLoaded', () => main());
}