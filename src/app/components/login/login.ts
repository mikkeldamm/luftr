import {Component} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

import {AuthHttp, JwtHelper} from 'angular2-jwt';

@Component({
    selector: 'login',
    directives: [FORM_DIRECTIVES],
    styles: [require('./login.scss')],
    template: require('./login.html')
})
export class Login {

    loginForm: ControlGroup;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private _http: Http, formBuilder: FormBuilder) {

        this.loginForm = formBuilder.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    login(event) {
        
        event.preventDefault();
        
        let email = this.loginForm.controls["email"].value;
        let password = this.loginForm.controls["password"].value;
        
        const contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        
        let body = JSON.stringify({
            username: email, 
            password: password,
            "client_id": "RRjfqTxQZUIpy7aCRDMscCFOsVDEdbwT",
            "connection":  "Username-Password-Authentication",
            "grant_type": "password",
            "scope": "openid",
            "device": ""
        });
        
        this._http.post('https://lufer.eu.auth0.com/oauth/ro', body, { headers: contentHeaders })
            .subscribe(
                response => {
                    console.log(response);
                },
                error => {
                    console.log(error.text());
                }
            );
    }
}