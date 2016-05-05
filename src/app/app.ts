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
} from 'angular2/core';
import {RouteConfig, Router, RouteData, AuxRoute, ROUTER_DIRECTIVES} from 'angular2/router';

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
    { path: '/login', component: Home, name: 'Login' },
    { path: '/login/oauth', component: LoginSocial, name: 'LoginAuth' },
    { path: '/register', component: Home, name: 'RegisterUser' },
    { path: '/profile/...', component: Profile, name: 'Profile' }
])
export class App implements OnInit {
    
    isModalActive: boolean = false;
    
    componentReference: ComponentRef;
    
    constructor(
        private _router: Router,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef,
        private _injector: Injector
        ) {
            
    }
    
    ngOnInit() {
        
        this._router.subscribe((url) => {
            
            if (url === "login") {
                
                this.closeModal();
                this.loadLoginComponent();
                
            } else if (url === "register") {
                
                this.closeModal();
                this.loadRegisterComponent();
            }
        });
    }
    
    closeModal() {
        
        if (this.componentReference) {
            this.componentReference.dispose();
            this.isModalActive = false;
        }
    }
    
    // TODO: Find better way to handle load of component into modal
    private loadLoginComponent() {
        
        var componentPromise = this._dynamicComponentLoader.loadIntoLocation(Login, this._elementRef, 'modal');
        
        componentPromise.then((comRef) => {
            
            this.isModalActive = true;
            this.componentReference = comRef;
        });
    }
    
    private loadRegisterComponent() {
        
        var componentPromise = this._dynamicComponentLoader.loadIntoLocation(RegisterUser, this._elementRef, 'modal');
        
        componentPromise.then((comRef) => {
            
            this.isModalActive = true;
            this.componentReference = comRef;
        });
    }
}