import {OpaqueToken, Provider} from '@angular/core';

function _window(): any {
    return window;
}

export const WINDOW: OpaqueToken = new OpaqueToken('WindowToken');

export abstract class WindowRef {
    get nativeWindow(): any {
        return null; // find a way to return "unimplemented"
    }
}

export class BrowserWindowRef extends WindowRef {
    constructor() {
        super();
    }
    get nativeWindow(): any {
        return _window();
    }
}


export const WINDOW_PROVIDERS = [
    new Provider(WindowRef, { useClass: BrowserWindowRef }),
    new Provider(WINDOW, { useFactory: _window, deps: [] }),
];