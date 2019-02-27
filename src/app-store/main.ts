import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { environment } from './environments/environment';
import { AppBrowserModule } from './app.browser.module';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule)
    .then(() => {
      if ('serviceWorker' in navigator && environment.production) {
        navigator.serviceWorker.register('/ngsw-worker.js');
      }
    })
    .catch(err => console.error(err));
});
