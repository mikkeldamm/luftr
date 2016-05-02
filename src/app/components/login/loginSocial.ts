import {Component} from 'angular2/core';
import {OnActivate, ComponentInstruction} from 'angular2/router';
import {URLSearchParams} from 'angular2/http';

import {AuthState} from '../../state/authState';

@Component({
    selector: 'login-social',
    template: '<div>Social Login</div>'
})
export class LoginSocial implements OnActivate {

    constructor(private _authState: AuthState) {
               
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
                        
                        this.setAuthenticatedState(accessToken);
                        this.redirectAfterAuthenticated();
                        
                        resolve(true);
                        return;
                    }
                }
                
                // show error message in view
                resolve(true);
            }
        );
    }

    redirectAfterAuthenticated() {
        
        window.location.href = "/";
    }
    
    setAuthenticatedState(token: string) {
        
        this._authState.setAuthenticated(token);
    }
}