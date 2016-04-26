import {Component, Directive, ElementRef, Renderer, ViewEncapsulation, HostListener} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

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
    { path: '/login', component: Login, name: 'Login' },
    { path: '/login/oauth', component: Login, name: 'LoginAuth' },
    { path: '/register', component: RegisterUser, name: 'RegisterUser' },
    { path: '/profile/...', component: Profile, name: 'Profile' }
])
export class App {
    
    shouldShowScene: boolean = false;
    isScrolledDown: boolean = false;
    
    constructor(public router: Router) {
        
        router.subscribe((url) => {
            
            this.shouldShowScene = url === "";
        });
    }
    
    @HostListener('window:scroll', ['$event']) 
    handleScrollEvent(e) {
        
        if (window.pageYOffset > 70) {
            this.isScrolledDown = true;
        } else {
            this.isScrolledDown = false;
        }
    }
}