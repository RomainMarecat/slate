// Load zone.js for the server.
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as domino from 'domino';
import * as fs from 'fs';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import * as del from 'del';
import { join } from 'path';
import 'reflect-metadata';
import * as ws from 'ws';
import * as xmlhttprequest from 'xmlhttprequest';
import 'zone.js/dist/zone-node';
import { ROUTES } from './route.paths';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./functions/dist/server/main');
// for mock global window by domino
const template = fs.readFileSync(path.join(process.cwd(), 'functions', 'dist', 'browser', 'index.html')).toString();
const win = domino.createWindow(template);
(win.navigator as any).language = 'fr';
// from server build
const files = fs.readdirSync(`${process.cwd()}/functions/dist/server`);
// mock
(global as any).window = win;
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
(global as any).document = win.document;
// othres mock
(global as any).CSS = null;
(global as any).Prism = null;
// Polyfills required for Firebase
(global as any).WebSocket = ws;
(global as any).XMLHttpRequest = xmlhttprequest.XMLHttpRequest;

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join(process.cwd(), 'functions', 'dist', 'browser', 'index.html'), 'utf8');

let previousRender = Promise.resolve();
const BROWSER_FOLDER = join(process.cwd(), 'static');

// Suppression des anciennes routes auto générées pour les rafraichir.
if (existsSync(BROWSER_FOLDER)) {
  del.sync(BROWSER_FOLDER);
  mkdirSync(BROWSER_FOLDER);
} else {
  mkdirSync(BROWSER_FOLDER);
}

// Iterate each route path
ROUTES.forEach(route => {
  const fullPath = join(BROWSER_FOLDER, route);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    let syncpath = BROWSER_FOLDER;
    route.split('/').forEach((element) => {
      if (!!element) {
        syncpath = join(syncpath, element);
        if (!existsSync(syncpath)) {
          mkdirSync(syncpath);
        }
      }
    });
  }
  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
    document: index,
    url: route,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  })).then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
