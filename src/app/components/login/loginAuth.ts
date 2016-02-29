import {Component} from 'angular2/core';
import {OnActivate, ComponentInstruction} from 'angular2/router';
import {Http, Headers, URLSearchParams} from 'angular2/http';

@Component({
    selector: 'login-auth',
    template: ''
})
export class LoginAuth implements OnActivate {

    constructor() {

    }
    
    routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
        
        return new Promise<boolean>(
            (resolve, reject) => {
                
                let authHash = window.location.hash;
                if (authHash) {
                    
                    authHash = authHash.substr(1);
                    
                    let params = new URLSearchParams(authHash);
                    let accessToken = params.get("access_token");
                    
                    if (accessToken) {
                        
                        // save access token here
                        
                        alert(accessToken);
                        
                        window.location.href = "/";
                        resolve(true);
                        return;
                    }
                }
                
                window.location.href = "/login";
            }
        );
    }
}