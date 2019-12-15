import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StateTransferInitializerModule } from '@nguniversal/common';
import { ɵORIGIN_URL } from '@nguniversal/common/tokens';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { TranslateBrowserLoader } from './shared/services/translate-browser-loader.service';

// the Request object only lives on the server
export function getRequest(): any {
  return {headers: {cookie: document.cookie}};
}

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState): TranslateBrowserLoader {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppModule,
    RouterModule,
    StateTransferInitializerModule,
    BrowserTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: exportTranslateStaticLoader,
        deps: [HttpClient, TransferState]
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: false}),
  ],
  providers: [
    {
      provide: REQUEST,
      useFactory: getRequest
    },
    {
      provide: ɵORIGIN_URL,
      useValue: location.origin
    },
  ],

})
export class AppBrowserModule {
}
