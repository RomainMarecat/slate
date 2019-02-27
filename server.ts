// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// for debug
// require('source-map-support').install();

// for tests
const test = process.env['TEST'] === 'true';

// ssr DOM
const domino = require('domino');
const fs = require('fs');
const path = require('path');
// index from browser build!
const template = fs
  .readFileSync(path.resolve(__dirname, './functions/dist/browser/index.html'), 'utf8')
  .toString();

// for mock global window by domino
const win = domino.createWindow(template);
win.navigator.language = 'fr';
// from server build
const files = fs.readdirSync(`${process.cwd()}/functions/dist/server`);
// mock
global['window'] = win;
// not implemented property and functions
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
// mock documnet
global['document'] = win.document;
// othres mock
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';

// Polyfills required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const DIST_FOLDER = join(process.cwd(), 'functions/dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(`./functions/dist/server/main`);

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {req});
});


// Start up the Node server
if (!process.env.FUNCTION_NAME) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

