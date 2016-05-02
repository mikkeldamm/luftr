import {
        Injector, 
        Component, 
        ElementRef, 
        Renderer, 
        ViewEncapsulation, 
        HostListener, 
        DynamicComponentLoader,
        ComponentRef
} from 'angular2/core';
import {RouteConfig, Router, AuxRoute, ROUTER_DIRECTIVES} from 'angular2/router';

import {Hero} from './components/hero/hero';
import {Logo} from './components/logo/logo';
import {Navigation} from './components/navigation/navigation';
import {Footer} from './components/footer/footer';

import {Home} from './components/home/home';
import {Login} from './components/login/login';
import {RegisterUser} from './components/register/registerUser';
import {Profile} from './components/profile/profile';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    directives: [
        ...ROUTER_DIRECTIVES,
        Logo,
        Navigation,
        Hero,
        Footer
    ], 
    template: require('./app.html')
})
@RouteConfig([
    { path: '/', component: Home, name: 'Home', useAsDefault: true },
    { path: '/login', component: Home, name: 'Login' },
    { path: '/login/oauth', component: Login, name: 'LoginAuth' },
    { path: '/register', component: Home, name: 'RegisterUser' },
    { path: '/profile/...', component: Profile, name: 'Profile' }
])
export class App {
    
    shouldShowScene: boolean = true;
    isScrolledDown: boolean = false;
    
    isModalActive: boolean = false;
    componentReference: ComponentRef;
    
    constructor(
        private _router: Router,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef,
        private _injector: Injector
        ) {
        
        _router.subscribe((url) => {
            
            //this.shouldShowScene = url === "";
            
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
    
    // TODO: make this a directive instead
    @HostListener('window:scroll', ['$event']) 
    handleScrollEvent(e) {
        
        if (window.pageYOffset > 70) {
            this.isScrolledDown = true;
        } else {
            this.isScrolledDown = false;
        }
    }
}