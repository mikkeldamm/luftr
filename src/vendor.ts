// import 'ie-shim';
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';
import 'es7-reflect-metadata';
import 'zone.js/dist/zone-microtask';

if ('production' === process.env.ENV) {
    // Production

    // RxJS
    // In production manually include the operators you use
    require('rxjs/add/operator/map');
    require('rxjs/add/operator/debounceTime');
    require('rxjs/add/operator/distinctUntilChanged');
    require('rxjs/add/operator/switchMap');
    require('rxjs/add/observable/from');
    require('rxjs/add/observable/fromArray');
    require('rxjs/add/observable/fromEvent');

} else {
    // Development

    Error['stackTraceLimit'] = Infinity;

    require('zone.js/dist/long-stack-trace-zone');

    // RxJS
    // In production manually include the operators you use
    require('rxjs/add/operator/map');
    require('rxjs/add/operator/debounceTime');
    require('rxjs/add/operator/distinctUntilChanged');
    require('rxjs/add/operator/switchMap');
    require('rxjs/add/observable/from');
    require('rxjs/add/observable/fromArray');
    require('rxjs/add/observable/fromEvent');

}
