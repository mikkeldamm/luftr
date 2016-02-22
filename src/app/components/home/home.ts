import {Component} from 'angular2/core';

@Component({
    selector: 'home',
    styles: [ require('./home.scss') ],
    template: require('./home.html')
})
export class Home {
    constructor() {
    }
}