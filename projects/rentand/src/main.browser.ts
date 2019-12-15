import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppBrowserModule } from './app/app-browser.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// not sure needed
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule)
    .then(() => {
      if ('serviceWorker' in navigator && environment.production) {
        navigator.serviceWorker.register('/ngsw-worker.js');
      }
    });
});



