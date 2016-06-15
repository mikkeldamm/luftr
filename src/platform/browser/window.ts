import {OpaqueToken, Provider} from '@angular/core';

function _window(): any {
    return window;
}

export const WINDOW: OpaqueToken = new OpaqueToken('WindowToken');

export class WindowRef {
    constructor() {
    }
    get nativeWindow(): any {
        return _window();
    }
}

export const WINDOW_PROVIDERS = [
    new Provider(WindowRef, { useClass: WindowRef }),
    new Provider(WINDOW, { useFactory: _window, deps: [] }),
];