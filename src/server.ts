import * as path from 'path';
import * as express from 'express';
import * as request from 'request';
import * as cookieParser from 'cookie-parser';

var dotenv = require('dotenv');

// Angular 2
import {ng2engine, REQUEST_URL, SERVER_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {provide, enableProdMode} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

import {CookieThing, AuthUser, AuthUserNode} from './cookiething';
import {App} from './components/app';

dotenv.load();

let app = express();
let root = path.join(path.resolve(__dirname, '..'));

enableProdMode();

// Express View
app.engine('.html', ng2engine);
app.set('views', __dirname);
app.set('view engine', 'html');

function ngApp(req, res) {
  
  let baseUrl = '/';
  let url = req.originalUrl || '/';
  
  res.render('index', {
    App,
    providers: [
      provide(APP_BASE_HREF, {useValue: baseUrl}),
      provide(REQUEST_URL, {useValue: req.originalUrl}),
      ROUTER_PROVIDERS,
      SERVER_LOCATION_PROVIDERS,
      HTTP_PROVIDERS,
      provide(AuthUser, {
         useFactory: () => {
            return new AuthUserNode().getUser(req.cookies.auth_token);
         }
      }),
      provide(CookieThing, {
          useFactory: () => {
              return new CookieThing(req.cookies);
          }
      }),
      provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({tokenGetter: ""}), http); // TODO: make tokenGetter use cookies
        },
        deps: [Http]
      })
    ],
    preboot: true
  });
}

// Use cookies
app.use(cookieParser());

// Serve static files
app.use(express.static(root));

// Routes
app.get('/auth/token', function(req, res) {
    
    var code = req.query.code;
    
    var body = {
        'client_id':     process.env.AUTH0_CLIENT_ID,
        'client_secret': process.env.AUTH0_CLIENT_SECRET,
        'redirect_uri':  'http://localhost:3000',
        'code':          code,
        'grant_type':    'authorization_code'
    }
    
    request({
            method: 'POST',
            url: 'https://lufer.eu.auth0.com/oauth/token',
            form: body
        }, function (err, resp, body) {

        if(err) {
            throw new Error('Some error');
        }
        
        var result = JSON.parse(body);
        var accessToken = result['access_token'];
        var idToken = result['id_token'];
        
        if (!idToken) {
            throw new Error("Didn't get any access token");
        }
        
        res.cookie('auth_token', idToken);
        res.redirect("/user");
    });
});

app.use('/*', ngApp);

// Server
app.listen(3000, () => {
  console.log('Listen on http://localhost:3000');
});