import {Component} from 'angular2/core';

@Component({
    selector: 'hero',
    styles: [ require('./hero.scss') ],
    template: require('./hero.html')
})
export class Hero {
    constructor() {
    }
}