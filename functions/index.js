require('zone.js/dist/zone-node');

const functions = require('firebase-functions');
const express = require('express');
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const {enableProdMode} = require('@angular/core');
const {renderModuleFactory} = require('@angular/platform-server');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

enableProdMode();

const template = require('fs')
    .readFileSync(path.resolve(__dirname, './dist/browser/index.html'), 'utf8')
    .toString();

const win = domino.createWindow(template);
win.navigator.language = 'fr';
global["window"] = win;

Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});
global['document'] = win.document;
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;


let app = express();

app.get('**', function (req, res) {
    renderModuleFactory(AppServerModuleNgFactory, {
        url: req.path,
        document: template,
        extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
    }).then(html => res.status(200).send(html));
});

exports.ssr = functions
    .https.onRequest(app);
