import {Injectable} from 'angular2/core';
import {URLSearchParams, Jsonp} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SceneCityAutocompleteService {
    
    constructor(private jsonp: Jsonp) {
        
    }
    
    search(term: string) {
        
        let search = new URLSearchParams()
        search.set('q', term);
        search.set('per_side', '6');
        search.set('format', 'json');
        
        if (term) {
            
            console.log("sfsf");
        
            return this.jsonp
                        .get('https://dawa.aws.dk/postnumre/autocomplete?callback=JSONP_CALLBACK', { search })
                        .map((request) => request.json())
                        .map(items => this.mapDawaCityObjectToCityObject(items));
        }
        
        return Observable.of([]);
    }
    
    private mapDawaCityObjectToCityObject(dawaCities) {
        
        let cities: SceneCity[] = [];
        
        for (var i = 0; i < dawaCities.length; i++) {
            var dawaCity = dawaCities[i];
            cities.push({
                name: dawaCity.postnummer.navn,
                zip: dawaCity.postnummer.nr,
                text: dawaCity.tekst
            });
        }
        
        return cities;
    }
}

export interface SceneCity {
    name: string;
    zip: string;
    text: string;
}