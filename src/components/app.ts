import {Component, View} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'app',
    directives: [ ROUTER_DIRECTIVES ],
    template: require("./app.html")
})
/*
@RouteConfig([
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' },
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])
*/
export class App {

    lock = new Auth0Lock('AUTH0_CLIENT_ID', 'AUTH0_DOMAIN');
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: Http, public authHttp: AuthHttp) {
        
    }

    login() {
        
        this.lock.show((err: string, profile: string, id_token: string) => {

            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
        });
    }

    logout() {
        
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        
        return tokenNotExpired();
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