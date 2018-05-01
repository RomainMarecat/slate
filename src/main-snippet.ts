import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app-snippet/app.module';
import { environment } from './environments/environment.snippet';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/ngsw-worker.js') ;
    }
  })
  .catch(err => console.error(err));
