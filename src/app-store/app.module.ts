import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRootComponent } from './core/root.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { Angulartics2Module } from 'angulartics2';
import { environment } from './environments/environment';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateBrowserLoader } from '../shared/i18n/translate-browser-loader.service';
import { MenuModule } from '../shared/menu/menu.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CheckForUpdateService } from '../shared/pwa/shared/check-for-update.service';

registerLocaleData(localeFr);
registerLocaleData(localeEn);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState): TranslateBrowserLoader {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}

@NgModule({
  imports: [
    Angulartics2Module.forRoot({
      developerMode: !environment.production,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: environment.firebase.projectId}),
    CommonModule,
    CoreModule.forRoot(environment),
    MenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    TransferHttpCacheModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: exportTranslateStaticLoader, // (createTranslateLoader)
        deps: [HttpClient, TransferState]
      }
    }),
  ],
  declarations: [
    AppRootComponent
  ],
  bootstrap: [
    AppRootComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    CheckForUpdateService,
  ]
})
export class AppModule {
}
