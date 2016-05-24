import {Provider} from '@angular/core';

export class AuthState {
    
    isAuthenticated(): boolean {
        
        let authData: AuthStorage = localStorage.getItem("luftr_auth");
        
        return authData && authData.accessToken ? true : false;
    }
    
    setAuthenticated(token: string, idToken: string, jwt: string): void {
        
        let data = <AuthStorage>{
            accessToken: token,
            idToken: idToken,
            jwt: jwt
        };
        
        localStorage.setItem("luftr_auth", JSON.stringify(data));
    }
    
    setNotAuthenticated(): void {
        
        localStorage.removeItem("luftr_auth");
    }
}

interface AuthStorage {
    accessToken: string;
    idToken: string;
    jwt: string;
}

export const AUTH_STATE = [
    new Provider(AuthState, { useClass: AuthState })
];