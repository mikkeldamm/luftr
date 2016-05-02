import {Component} from 'angular2/core';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import {Http, Headers, URLSearchParams} from 'angular2/http';

import {EmailValidator, PasswordValidator} from '../../validation/formValidators';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {AuthState, SocialAuth} from '../../state/authState';

@Component({
    selector: 'login',
    directives: [FORM_DIRECTIVES],
    styles: [require('./login.scss')],
    template: require('./login.html')
})
export class Login {

    email: Control;
    password: Control;
    loginForm: ControlGroup;

    constructor(
        private _http: Http, 
        private _authState: AuthState,
        private _formBuilder: FormBuilder) {

        this.email = new Control("", Validators.compose([Validators.required, EmailValidator.invalidEmail]));
        this.password = new Control("", Validators.required);
        
        this.loginForm = this._formBuilder.group({
            email: this.email,
            password: this.password
        });
    }
    
    login(event) {
        
        event.preventDefault();
        
        if (this.loginForm.valid) {
        
            const contentHeaders = new Headers();
            contentHeaders.append('Accept', 'application/json');
            contentHeaders.append('Content-Type', 'application/json');
            
            let body = JSON.stringify({
                "username": this.email.value, 
                "password": this.password.value,
                "client_id": this._authState.authClientId,
                "connection":  "Username-Password-Authentication",
                "grant_type": "password",
                "scope": "openid",
                "device": ""
            });
            
            this._http.post(this._authState.authDomain + '/oauth/ro', body, { headers: contentHeaders })
                .map(response => response.json())
                .subscribe((response:any) => {
                        
                    this.setAuthenticatedState(response.access_token);
                    this.redirectAfterAuthenticated();
                },
                error => {
                    
                    console.log(error.text());
                });
        }
    }
    
    facebookLink() {
        
        return this._authState.getSocialOAuthUrl(SocialAuth.facebook);
    }

    googleLink() {
        
        return this._authState.getSocialOAuthUrl(SocialAuth.google);
    }
    
    redirectAfterAuthenticated() {
        
        window.location.href = "/";
    }
    
    setAuthenticatedState(token: string) {
        
        this._authState.setAuthenticated(token);
    }
}