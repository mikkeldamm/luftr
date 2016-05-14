import {Component, Input} from '@angular/core';

import {SceneCityAutocomplete} from './sceneCityAutocomplete';

@Component({
    selector: 'hero',
    styles: [ require('./hero.scss') ],
    template: require('./hero.html'),
    directives: [SceneCityAutocomplete]
})
export class Hero {
    
    constructor() {
    }
}