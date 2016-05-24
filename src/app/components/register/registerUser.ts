import {Component} from '@angular/core';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, OnActivate, ComponentInstruction} from '@angular/router-deprecated';
import {Http, Headers, URLSearchParams} from '@angular/http';

import {EmailValidator, PasswordValidator} from '../../validation/formValidators';
import {Auth, AuthState, SocialAuth} from '../../auth';

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
        private _auth: Auth,
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

            this._auth
                .register(this.email.value, this.password.value)
                .subscribe(response => {

                    this.redirectToLoginAfterRegistered();
                },
                error => {

                    console.log(error.text());
                });
        }
    }

    facebookLink() {
        
        return this._auth.getSocialOAuthUrl(SocialAuth.facebook);
    }

    googleLink() {
        
        return this._auth.getSocialOAuthUrl(SocialAuth.google);
    }

    redirectToLoginAfterRegistered() {

        this._router.navigate(["Login"]);
    }
}