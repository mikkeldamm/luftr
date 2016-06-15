import {
  REQUEST_URL,
  ORIGIN_URL,
  BASE_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

import { APP_BASE_HREF } from '@angular/common';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';
import { App, APP_PROVIDERS } from './app';

export function ngApp(req, res) {

    let baseUrl = '/';
    let url = req.originalUrl || '/';

    let config: ExpressEngineConfig = {
        directives: [
            App
        ],
        platformProviders: [
            { provide: ORIGIN_URL, useValue: 'http://localhost:3000' },
            { provide: APP_BASE_HREF, useValue: baseUrl },
            PROVIDERS,
            ENV_PROVIDERS,
            DIRECTIVES,
            PIPES,
            APP_PROVIDERS,
            FIREBASE_PROVIDERS,
            defaultFirebase('https://luftr-1236.firebaseio.com')
        ],
        providers: [
            { provide: REQUEST_URL, useValue: url },
            DIRECTIVES,
            NODE_ROUTER_PROVIDERS,
            NODE_HTTP_PROVIDERS,
        ],
        async: true,
        preboot: false
    };

    res.render('index', config);
}

/*
App, [
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS,
    ...FIREBASE_PROVIDERS,
    defaultFirebase('https://luftr-1236.firebaseio.com')
  ]
  */