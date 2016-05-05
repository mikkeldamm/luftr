import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {HeadlineComponent} from '../../app/components/headline/headline.component';

export const APPLICATION_DIRECTIVES = [
    ...ROUTER_DIRECTIVES,
    HeadlineComponent
];

export const DIRECTIVES = [
    provide(PLATFORM_DIRECTIVES, { useValue: APPLICATION_DIRECTIVES, multi: true })
];