import {Component, OnInit, Directive, ElementRef, Renderer, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router, RouterOutlet} from '@angular/router-deprecated';

import {ProfileInfo} from './info/profileInfo';
import {ProfileWalker} from './walker/profileWalker';

@Component({
    selector: 'profile',
    template: '<router-outlet></router-outlet>',
    directives: [RouterOutlet]
})
@RouteConfig([
    { path: '/info', component: ProfileInfo, name: 'ProfileInfo', useAsDefault: true },
    { path: '/walker', component: ProfileWalker, name: 'ProfileWalker' }
])
export class Profile implements OnInit {
    
    constructor() {
        
    }
    
    ngOnInit() {
        
    }
}