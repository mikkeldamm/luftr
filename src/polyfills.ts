import 'core-js/es6';
import 'core-js/es7/reflect';

require('zone.js/dist/zone');

import 'ts-helpers';

if ('production' === ENV) {

  
  
} else {

  Error.stackTraceLimit = Infinity;

  require('zone.js/dist/long-stack-trace-zone');
}