import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { enableProdMode } from '@angular/core';
import { expressEngine } from 'angular2-universal';

enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '../luftr/dist'));

app.engine('.html', expressEngine);
app.set('views', ROOT);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static(ROOT, {index: false}));

import { ngApp } from './main.node';

app.use('/*', ngApp);

// use indexFile over ngApp only when there is too much load on the server
function indexFile(req, res) {
    res.sendFile('/index.html', {root: ROOT});
}

app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});
