import {Component, Directive, ElementRef, Renderer, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'home',
    template: `
  Home
  `
})
export class Home {
}

@Component({
    selector: 'about',
    template: `
  About
  `
})
export class About {
}


@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    directives: [
        ...ROUTER_DIRECTIVES
    ],
    styles: [require('./app.scss')],
    template: require('./app.html')
})
@RouteConfig([
    { path: '/', component: Home, name: 'Home' },
    { path: '/home', component: Home, name: 'Home' },
    { path: '/about', component: About, name: 'About' }
])
export class App {
    name: string = 'Angular 2';
    constructor() {
        console.log("what");
    }
}