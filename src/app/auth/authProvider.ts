import {Injectable, Provider} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {WindowRef} from '../../platform/browser/window';

@Injectable()
export abstract class Auth {

    private _authConfig: AuthConfig;
    private _authRedirectUrl: string;
    
    constructor(
        private _window: WindowRef,
        private _http: Http) {
        
        this._authConfig = require('./authConfig.json');
        this._authRedirectUrl = _window.nativeWindow.location.origin + '/login/oauth'
    }
    
    getSocialOAuthUrl(type: SocialAuth): string {

        let urlParams = new URLSearchParams();
        urlParams.append("response_type", "token");
        urlParams.append("client_id", this._authConfig.authClientId);
        urlParams.append("redirect_uri", this._authRedirectUrl);
        urlParams.append("connection", type == SocialAuth.facebook ? "facebook" : "google-oauth2");
        urlParams.append("scope", "openid");

        return this._authConfig.authDomain + '/authorize?' + urlParams.toString();
    }
    
    oauth(token: string) {
        
        const contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/json');
        
        let body = JSON.stringify({
            "access_token": token,
            "client_id": this._authConfig.authClientId,
            "connection":  "facebook",
            "scope": "openid"
        });
        
        return this._http
            .post(this._authConfig.authDomain + '/oauth/access_token', body, { headers: contentHeaders })
            .map<OAuthResponse>(response => response.json());
    }
    
    login(email: string, password: string): Observable<LoginResponse> {
        
        const contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        
        let body = JSON.stringify({
            "username": email, 
            "password": password,
            "client_id": this._authConfig.authClientId,
            "connection":  "Username-Password-Authentication",
            "grant_type": "password",
            "scope": "openid",
            "device": ""
        });
        
        return this._http
            .post(this._authConfig.authDomain + '/oauth/ro', body, { headers: contentHeaders })
            .map<LoginResponse>(response => response.json());
    }
    
    register(email: string, password: string): Observable<RegisterResponse> {
        
        const contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/json');

        let body = JSON.stringify({
            "email": email,
            "password": password,
            "client_id": this._authConfig.authClientId,
            "connection": "Username-Password-Authentication"
        }); 

        return this._http
            .post(this._authConfig.authDomain + '/dbconnections/signup', body, { headers: contentHeaders })
            .map<RegisterResponse>(response => response.json());
    }

    delegation(accessToken: string, idToken: string): Observable<AuthResponse> {

        const contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/json');

        let body = JSON.stringify({
            "client_id": this._authConfig.authClientId,
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "scope": "openid",
            "api_type": "firebase",
            "id_token": idToken
        });

        return this._http
            .post(this._authConfig.authDomain + '/delegation', body, { headers: contentHeaders })
            .map<AuthResponse>(response => {
                let res = <DelegationResponse>response.json();
                return <AuthResponse>{
                    accessToken: accessToken,
                    idToken: idToken,
                    jwt: res.id_token
                }
            });
    }
}

interface AuthConfig {
    authDomain: string;
    authClientId: string;
    authRedirectUrl: string;
}

export interface OAuthResponse {
    access_token: string;
    id_token: string;
}

export interface LoginResponse {
    access_token: string;
    id_token: string;
}

export interface RegisterResponse {
    id_token: string;
}

export interface DelegationResponse {
    token_type: string;
    expires_in: number;
    id_token: string;
}

export interface AuthResponse {
    accessToken: string;
    idToken: string;
    jwt: string;
}

export enum SocialAuth {
    facebook,
    google
}

export const AUTH_PROVIDERS = [
    new Provider(Auth, { useClass: Auth })
];