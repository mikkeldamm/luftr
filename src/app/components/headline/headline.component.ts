import {Component, OnInit, EventEmitter} from 'angular2/core';

@Component({
    selector: 'headline',
    template: require('./headline.component.html'),
    styles: [require('./headline.component.scss')]    
})

export class HeadlineComponent implements OnInit {

    constructor() {

    }
    
    ngOnInit() {
        
    }
}