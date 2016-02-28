import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'nav',
    directives: [ROUTER_DIRECTIVES], 
    template: require('./navigation.html')
})
export class Navigation {
    constructor() {
    }
}