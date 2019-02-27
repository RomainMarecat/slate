import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { AppModule } from './app.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StateTransferInitializerModule } from '@nguniversal/common';
import { AppRootComponent } from './core/root.component';
import { environment } from './environments/environment';
import { TranslatesBrowserModule } from '../shared/i18n/translates-browser';
import { AppRoutingBrowserModule } from './app-routing.browser.module';

export function getRequest(): any {
  return {headers: {cookie: document.cookie}};
}

@NgModule({
  bootstrap: [
    AppRootComponent
  ],
  imports: [
    AppModule,
    StateTransferInitializerModule,
    BrowserTransferStateModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    TranslatesBrowserModule,
    AppRoutingBrowserModule
  ],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest,
    },
    {provide: 'ORIGIN_URL', useValue: location.origin},
  ],
})
export class AppBrowserModule {
}
