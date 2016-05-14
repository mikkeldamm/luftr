import {Component, ViewEncapsulation} from '@angular/core';

import {Hero} from '../hero/hero';

@Component({
    selector: 'home',
    styles: [ require('./home.scss') ],
    template: require('./home.html'),
    directives: [Hero],
    encapsulation: ViewEncapsulation.None
})
export class Home {
    constructor() {
    }
}