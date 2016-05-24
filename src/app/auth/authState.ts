import {Provider} from '@angular/core';

export class AuthState {
    
    private _data: AuthStorage;
    
    get accessToken(): string {
        
        return this.Data.accessToken;
    }
    
    get idToken(): string {
        
        return this.Data.idToken;
    }
    
    get jwtToken(): string {
        
        return this.Data.jwt;
    }
    
    isAuthenticated(): boolean {
        
        let authData: AuthStorage = localStorage.getItem("luftr_auth");
        
        return authData && authData.accessToken ? true : false;
    }
    
    setAuthenticated(token: string, idToken: string, jwt: string): void {
        
        this._data = <AuthStorage>{
            accessToken: token,
            idToken: idToken,
            jwt: jwt
        };
        
        localStorage.setItem("luftr_auth", JSON.stringify(this._data));
    }
    
    setNotAuthenticated(): void {
        
        localStorage.removeItem("luftr_auth");
    }
    
    private get Data() {
        
        if (!this._data)
            this._data = this.getAuthStorage();
            
        return this._data;
    }
    
    private getAuthStorage(): AuthStorage {
        
        return <AuthStorage>JSON.parse(localStorage.getItem("luftr_auth"));
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