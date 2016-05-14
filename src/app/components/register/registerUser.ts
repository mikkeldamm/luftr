import {Component} from '@angular/core';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, OnActivate, ComponentInstruction} from '@angular/router-deprecated';
import {Http, Headers, URLSearchParams} from '@angular/http';

import {EmailValidator, PasswordValidator} from '../../validation/formValidators';
import {AuthState, SocialAuth} from '../../state/authState';

@Component({
    selector: 'registerUser',
    directives: [FORM_DIRECTIVES],
    styles: [require('./registerUser.scss')],
    template: require('./registerUser.html')
})
export class RegisterUser {

    email: Control;
    password: Control;
    registerForm: ControlGroup;

    constructor(
        private _http: Http,
        private _router: Router,
        private _authState: AuthState,
        private _formBuilder: FormBuilder) {

        this.email = new Control("", Validators.compose([Validators.required, EmailValidator.invalidEmail]));
        this.password = new Control("", Validators.required);
        
        this.registerForm = this._formBuilder.group({
            email: this.email,
            password: this.password
        });
    }

    register(event) {

        event.preventDefault();
        
        if (this.registerForm.valid) {

            const contentHeaders = new Headers();
            contentHeaders.append('Content-Type', 'application/json');

            let body = JSON.stringify({
                "email": this.email.value,
                "password": this.password.value,
                "client_id": this._authState.authClientId,
                "connection": "Username-Password-Authentication"
            }); 

            this._http.post(this._authState.authDomain + '/dbconnections/signup', body, { headers: contentHeaders })
                .subscribe((response: any) => {

                    this.redirectToLoginAfterRegistered();
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

    redirectToLoginAfterRegistered() {

        this._router.navigate(["Login"]);
    }
}