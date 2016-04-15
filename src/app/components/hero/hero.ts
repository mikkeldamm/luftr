import {Component, Input} from 'angular2/core';

import {SceneCityAutocomplete} from './sceneCityAutocomplete';

@Component({
    selector: 'hero',
    styles: [ require('./hero.scss') ],
    template: require('./hero.html'),
    directives: [SceneCityAutocomplete]
})
export class Hero {
    
    @Input() shouldShow: boolean;
    
    constructor() {
    }
}