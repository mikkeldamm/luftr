import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from '@angular/common';
import {Http, Headers, URLSearchParams} from '@angular/http';

import {AuthHttp, JwtHelper} from 'angular2-jwt';

import {EmailValidator, PasswordValidator} from '../../validation/formValidators';
import {Auth, AuthState, SocialAuth} from '../../auth';

@Component({
    selector: 'login',
    directives: [FORM_DIRECTIVES],
    styles: [require('./login.scss')],
    template: require('./login.html')
})
export class Login implements OnInit {
    
    facebookLink: string;
    googleLink: string;
    
    email: Control;
    password: Control;
    loginForm: ControlGroup;

    constructor(
        private _http: Http, 
        private _auth: Auth,
        private _authState: AuthState,
        private _formBuilder: FormBuilder) {

        this.email = new Control("", Validators.compose([Validators.required, EmailValidator.invalidEmail]));
        this.password = new Control("", Validators.required);
        
        this.loginForm = this._formBuilder.group({
            email: this.email,
            password: this.password
        });
    }
    
    ngOnInit() {
        
        this.facebookLink = this._auth.getSocialOAuthUrl(SocialAuth.facebook);
        this.googleLink = this._auth.getSocialOAuthUrl(SocialAuth.google);
    }
    
    login(event) {
        
        event.preventDefault();
        
        if (this.loginForm.valid) {
        
            this._auth
                .login(this.email.value, this.password.value)
                .switchMap(res => {
                    return this._auth.delegation(res.access_token, res.id_token)
                })
                .subscribe(response => {
                    
                    this.setAuthenticatedState(
                        response.accessToken,
                        response.idToken,
                        response.jwt
                    );
                    
                    this.redirectAfterAuthenticated();
                },
                error => {
                    
                    console.log(error.text());
                });
        }
    }
    
    redirectAfterAuthenticated() {
        
        window.location.href = "/";
    }
    
    setAuthenticatedState(token: string, idToken: string, jwt: string) {
        
        this._authState.setAuthenticated(token, idToken, jwt);
    }
}