import {
        Injector, 
        Component, 
        OnInit,
        ElementRef, 
        Renderer, 
        ViewEncapsulation, 
        HostListener, 
        DynamicComponentLoader,
        ComponentRef
} from '@angular/core';
import {RouteConfig, Router, RouteData, AuxRoute, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

import {StickDirective} from './directives/stick.directive';
import {Hero} from './components/hero/hero';
import {Logo} from './components/logo/logo';
import {Navigation} from './components/navigation/navigation';
import {Footer} from './components/footer/footer';

import {Home} from './components/home/home';
import {Login} from './components/login/login';
import {LoginSocial} from './components/login/loginSocial';
import {RegisterUser} from './components/register/registerUser';
import {Profile} from './components/profile/profile';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    directives: [
        ...ROUTER_DIRECTIVES,
        StickDirective,
        Logo,
        Navigation,
        Footer
    ], 
    template: require('./app.html')
})
@RouteConfig([
    { path: '/', component: Home, name: 'Home', useAsDefault: true },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/login/oauth', component: LoginSocial, name: 'LoginAuth' },
    { path: '/register', component: RegisterUser, name: 'RegisterUser' },
    { path: '/profile/...', component: Profile, name: 'Profile' }
])
export class App implements OnInit {
    
    isModalActive: boolean = false;
    
    componentReference: ComponentRef<App>;
    
    constructor(
        private _router: Router,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef,
        private _injector: Injector,
        private _af: AngularFire
        ) {
            
    }
    
    ngOnInit() {
        
        /*
        this._router.subscribe((url) => {
            
            if (url === "login") {
                
                this.closeModal();
                this.loadLoginComponent();
                
            } else if (url === "register") {
                
                this.closeModal();
                this.loadRegisterComponent();
            }
        });
        */
        
        this._af.list('/users').subscribe((res) => {
           console.log(res); 
        });
        
        /*
        this._af.auth.login({
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2x1ZmVyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NmRmNTMzZDQzZWRiNWY5NWMxY2Q4NjgiLCJhdWQiOiJSUmpmcVR4UVpVSXB5N2FDUkRNc2NDRk9zVkRFZGJ3VCIsImV4cCI6MTQ2MzcyOTIyMCwiaWF0IjoxNDYzNjkzMjIwLCJ2IjowLCJkIjp7ImZiX2lkIjoiWVhWMGFEQjhOVFprWmpVek0yUTBNMlZrWWpWbU9UVmpNV05rT0RZNCIsInVpZCI6ImF1dGgwOjU2ZGY1MzNkNDNlZGI1Zjk1YzFjZDg2OCJ9LCJhenAiOiJSUmpmcVR4UVpVSXB5N2FDUkRNc2NDRk9zVkRFZGJ3VCJ9.OOnHCobn1RwAmtjjxGw1Bco_vCzwjovoWFsm8egvzkg"
        }, {
            provider: AuthProviders.Custom,
            method: AuthMethods.CustomToken
        }).then((value) => {
            
            console.log(value);
            
            
        this._af.object('/users/123').update({
            userid: "auth0:56df533d43edb5f95c1cd868",
            firstName: "mikkel",
            lastName: "damm"
        });
            
        }).catch((err) => {
            
            console.log(err);
        });
        */
        
        /*
        this._af.object('/users/123/contact').set({
            phone: 21746766,
            email: "mikkeldamm@hotmail.com"
        });
        
        this._af.object('/users/123').update({
            userid: "auth0:56df533d43edb5f95c1cd868",
            firstName: "mikkel",
            lastName: "damm"
        });
        */
        
        /*
        this._af.object('/users/5677').update({
            firstName: "glen",
            lastName: "damm"
        });
        */
    }
    
    /*
    closeModal() {
        
        if (this.componentReference) {
            this.componentReference.destroy();
            this.isModalActive = false;
        }
    }
    
    // TODO: Find better way to handle load of component into modal
    private loadLoginComponent() {
        
        var componentPromise = this._dynamicComponentLoader.loadNextToLocation(Login, '#modal-content', this._injector);
        
        componentPromise.then((comRef) => {
            
            this.isModalActive = true;
            this.componentReference = comRef;
        });
    }
    
    private loadRegisterComponent() {
        
        var componentPromise = this._dynamicComponentLoader.loadAsRoot(RegisterUser, '#modal-content', this._injector);
        
        componentPromise.then((comRef) => {
            
            this.isModalActive = true;
            this.componentReference = comRef;
        });
    }
    */
}