import {Component, Directive, ElementRef, Renderer, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Hero} from './components/hero/hero';
import {Logo} from './components/logo/logo';
import {Navigation} from './components/navigation/navigation';
import {Footer} from './components/footer/footer';

import {Home} from './components/home/home';

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
    { path: '/', component: Home, name: 'Home' }
])
export class App {
    constructor() {
    }
}