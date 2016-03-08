import {Component} from 'angular2/core';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router, OnActivate, ComponentInstruction} from 'angular2/router';
import {Http, Headers, URLSearchParams} from 'angular2/http';

import {EmailValidator, PasswordValidator} from '../../validation/formValidators';
import {AuthState, SocialAuth} from '../../state/authState';

@Component({
    selector: 'register',
    directives: [FORM_DIRECTIVES],
    styles: [require('./register.scss')],
    template: require('./register.html')
})
export class Register {

    email: Control;
    password: Control;
    passwordConfirm: Control;
    registerForm: ControlGroup;

    constructor(
        private _http: Http,
        private _router: Router,
        private _authState: AuthState,
        private _formBuilder: FormBuilder) {

        this.email = new Control("", Validators.compose([Validators.required, EmailValidator.invalidEmail]));
        this.password = new Control("", Validators.required);
        this.passwordConfirm = new Control("", Validators.required);

        this.registerForm = this._formBuilder.group({
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm
        }, { 
            validator: PasswordValidator.compare('password', 'passwordConfirm') 
        });
    }

    login(event) {

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