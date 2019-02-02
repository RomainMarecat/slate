import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRootComponent } from './core/root.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { environment } from './environments/environment';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Angulartics2Module } from 'angulartics2';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CheckForUpdateService } from '../shared/pwa/shared/check-for-update.service';
import { MenuModule } from '../shared/menu/menu.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(localeFr);
registerLocaleData(localeEn);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    Angulartics2Module.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'recipe-384269'}),
    CoreModule.forRoot(environment),
    CommonModule,
    MenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
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
    CheckForUpdateService
  ]
})
export class AppModule {
}
