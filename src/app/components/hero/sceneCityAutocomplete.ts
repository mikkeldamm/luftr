import {Component, Injectable, ElementRef} from 'angular2/core';
import {Control} from 'angular2/common';
import {Observable} from 'rxjs/Observable';

import {SceneCityAutocompleteService, SceneCity} from './sceneCityAutocompleteService';

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

    cities: Observable<Array<SceneCity>>;
    showCities: boolean = false;
    isCitySelected: boolean = false;
    termCity = new Control();

    constructor(private elementRef: ElementRef, private cityAutocompleteService: SceneCityAutocompleteService) {

    }

    enableSearch() {
        
        this.cities = this.termCity.valueChanges
            .debounceTime(150)
            .distinctUntilChanged()
            .switchMap((term: string) => this.cityAutocompleteService.search(term));
            
        this.cities.subscribe(items => {
            this.showCities = items.length > 0;
        });
    }

    handleEvent(globalEvent) {
        
        if (this.eventTriggeredInsideHost(globalEvent) && this.isCitySelected === false) {
            if (!this.showCities) this.showCities = true;
            return;
        }

        this.isCitySelected = false;
        this.showCities = false;
    }
    
    select(city: SceneCity) {
        
        this.isCitySelected = true;
        this.cities = Observable.of([]);
        this.termCity.updateValue(city.text, {onlySelf: true, emitEvent: false, emitModelToViewChange: true});
    }

    private eventTriggeredInsideHost(event) {
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