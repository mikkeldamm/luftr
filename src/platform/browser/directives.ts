import { PLATFORM_DIRECTIVES } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {HeadlineComponent} from '../../app/components/headline/headline.component';

export const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
    HeadlineComponent
];

export const DIRECTIVES = [
  {provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];