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
    directives: [
        ...ROUTER_DIRECTIVES
    ],
    styles: [
        require('./app.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
  <div>
    <nav>
      <a [routerLink]=" ['./Home'] ">damm</a>
      <a [routerLink]=" ['./About'] ">About</a>
    </nav>
    <div>
      <span>Hello, {{ name }}!</span>
    </div>

    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
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