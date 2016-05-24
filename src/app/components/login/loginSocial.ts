import {Component} from '@angular/core';
import {OnActivate, ComponentInstruction} from '@angular/router-deprecated';
import {URLSearchParams} from '@angular/http';

import {Auth, AuthState} from '../../auth';

@Component({
    selector: 'login-social',
    template: '<div>Social Login</div>'
})
export class LoginSocial implements OnActivate {

    constructor(
        private _auth: Auth,
        private _authState: AuthState
        ) {
               
    }
    
    routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
        
        return new Promise<boolean>((resolve, reject) => {
                
                let authHash = window.location.hash;
                
                if (!authHash)
                    reject();
                    
                authHash = authHash.substr(1);
                
                let params = new URLSearchParams(authHash);
                let accessToken = params.get("access_token");
                let idToken = params.get("id_token");
                    
                if (!accessToken || !idToken)
                    reject();
                        
                        
                this._auth
                    .delegation(accessToken, idToken)
                    .subscribe(
                        response => {
                            
                            this._authState.setAuthenticated(
                                response.accessToken, 
                                response.idToken, 
                                response.jwt
                            );
                            
                            this.redirectAfterAuthenticated();
                    
                            resolve(true);
                        },
                        error => {
                            
                            reject();
                        }
                    );
            }
        );
    }

    redirectAfterAuthenticated() {
        
        window.location.href = "/";
    }
}