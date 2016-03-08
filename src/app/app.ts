import {Component, Directive, ElementRef, Renderer, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Hero} from './components/hero/hero';
import {Logo} from './components/logo/logo';
import {Navigation} from './components/navigation/navigation';
import {Footer} from './components/footer/footer';

import {Home} from './components/home/home';
import {Login} from './components/login/login';
import {Register} from './components/register/register';

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
    { path: '/register', component: Register, name: 'Register' }
])
export class App {
    
    shouldEnlarge: boolean = false;
    shouldShowScene: boolean = false;
    
    constructor(public router: Router) {
        
        router.subscribe((url) => {
            
            this.shouldEnlarge = url === "";
            this.shouldShowScene = url === "";
        });
    }
}