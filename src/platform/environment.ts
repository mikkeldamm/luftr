import { enableProdMode } from '@angular/core';

let PROVIDERS = [];

if (ENV === 'production') {
  
    enableProdMode();

    PROVIDERS = [
        ...PROVIDERS
    ];
  
} else {
  
    PROVIDERS = [
        ...PROVIDERS
    ];
}

export const ENV_PROVIDERS = [
    ...PROVIDERS
];