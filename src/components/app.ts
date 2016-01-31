import {Component, View} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

import {CookieThing, cookieTokenNotExpired, AuthUser} from '../cookiething';

declare var Auth0Lock;

@Component({
  selector: 'public-route',
  template: `<h1>Hello from a public route</h1>`
})
class PublicRoute {

}

@Component({
  selector: 'private-route',
  template: `<h1>Hello from private route</h1>`
})
@CanActivate(() => cookieTokenNotExpired())
class PrivateRoute {

}

@Component({
  selector: 'auth-token',
  template: ``
})
class AuthToken {
    
    constructor(user: AuthUser) {
        
        console.log("# User ------------");
        console.log(user);
        
        /*
        var lock = new Auth0Lock('RRjfqTxQZUIpy7aCRDMscCFOsVDEdbwT', 'lufer.eu.auth0.com');
        var hash = lock.parseHash();

        if (hash) {
            
            if (hash.error) {
                
                console.log("There was an error logging in", hash.error);
            
            } else {
                
                lock.getProfile(hash.id_token, function(err, profile) {
                    
                    if (err) {
                        console.log('Cannot get user :(', err);
                        return;
                    }

                    console.log("Hey dude", profile);
                });
            }
        }
        */
    }
}


@Component({
    selector: 'app',
    directives: [ ...ROUTER_DIRECTIVES ],
    template: require("./app.html")
})
@RouteConfig([
  { path: '/', component: PublicRoute, name: 'PublicRoute' },
  { path: '/user', component: AuthToken, name: 'AuthToken' },
  { path: '/public-route', component: PublicRoute, name: 'PublicRoute' },
  { path: '/private-route', component: PrivateRoute, name: 'PrivateRoute' }
])
export class App {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: Http, public authHttp: AuthHttp, public cookieStorage: CookieThing) {
        
    }

    login() {
        
        var lock = new Auth0Lock('RRjfqTxQZUIpy7aCRDMscCFOsVDEdbwT', 'lufer.eu.auth0.com');

        lock.show({ 
            container: 'root', 
            responseType: 'code', 
            callbackURL: 'http://localhost:3000/auth/token',
            socialBigButtons: true,
            dict: 'da'
        });
    }

    logout() {
        
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        
        return this.cookieStorage.existsCookie("id_token");
    //s    return tokenNotExpired();
    }

    getThing() {
        
        this.http.get('http://localhost:3001/ping')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    getSecretThing() {
        
        this.authHttp.get('http://localhost:3001/secured/ping')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    tokenSubscription() {
        
        this.authHttp.tokenStream.subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    useJwtHelper() {
        
        var token = localStorage.getItem('id_token');

        console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
        );
    }
}