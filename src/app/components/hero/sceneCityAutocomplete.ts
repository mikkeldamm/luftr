import {Component, Injectable, ElementRef} from 'angular2/core';
import {Control} from 'angular2/common';
import {Observable} from 'rxjs/Observable';

import {SceneCityAutocompleteService} from './sceneCityAutocompleteService';

@Component({
    selector: 'scene-city-autocomplete',
    styles: [require('./sceneCityAutocomplete.scss')],
    template: require('./sceneCityAutocomplete.html'),
    bindings: [SceneCityAutocompleteService],
    host: {
        "(document: click)": "handleEvent( $event )"
    }
})

export class SceneCityAutocomplete {

    cities: Observable<Array<string>>;
    showCities: boolean = false;
    termCity = new Control();

    constructor(private elementRef: ElementRef, private cityAutocompleteService: SceneCityAutocompleteService) {

        this.cities = this.termCity.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap((term: string) => this.cityAutocompleteService.search(term));

        this.cities.subscribe(items => {
            this.showCities = items.length > 0;
        });
    }

    handleEvent(globalEvent) {
        
        if (this.eventTriggeredInsideHost(globalEvent)) {
            if (!this.showCities) this.showCities = true;
            return;
        }

        this.showCities = false;
    }

    eventTriggeredInsideHost(event) {
        var current = event.target;
        var host = this.elementRef.nativeElement;
        
        do {
            if (current === host) {
                return (true);
            }
            current = current.parentNode;
        } while (current);
        
        return (false);
    }
}