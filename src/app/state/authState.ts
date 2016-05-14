import {URLSearchParams} from '@angular/http';

export class AuthState {
    
    authConfig: any;
    
    constructor() {
        
        this.authConfig = require('../config/authConfig.json');
    }
    
    get authDomain() {
        return this.authConfig.authDomain;
    }
    
    get authClientId() {
        return this.authConfig.authClientId;
    }
    
    getSocialOAuthUrl(type: SocialAuth) {

        var urlParams = new URLSearchParams();
        urlParams.append("response_type", "token");
        urlParams.append("client_id", "RRjfqTxQZUIpy7aCRDMscCFOsVDEdbwT");
        urlParams.append("redirect_uri", "http://localhost:3000/login/oauth");
        urlParams.append("connection", type == SocialAuth.facebook ? "facebook" : "google-oauth2");

        return this.authDomain + '/authorize?' + urlParams.toString();
    }
    
    isAuthenticated(): boolean {
        
        return localStorage.getItem("luftr_accesstoken") ? true : false;
    }
    
    setAuthenticated(token: string): void {
        
        localStorage.setItem("luftr_accesstoken", token);    
    }
    
    setNotAuthenticated(): void {
        
        localStorage.removeItem("luftr_accesstoken");
    }
}

export enum SocialAuth {
    facebook,
    google
}