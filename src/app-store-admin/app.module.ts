import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from '../shared/guard/admin.guard';
import { AppRootComponent } from './core/root.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { Angulartics2Module } from 'angulartics2';
import { environment } from './environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { CheckForUpdateService } from '../shared/pwa/shared/check-for-update.service';

registerLocaleData(localeFr);
registerLocaleData(localeEn);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    Angulartics2Module.forRoot(),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule.forRoot(environment),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  declarations: [
    AppRootComponent,
  ],
  bootstrap: [
    AppRootComponent
  ],
  providers: [
    AdminGuard,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    CheckForUpdateService
  ]
})
export class AppModule {
}
