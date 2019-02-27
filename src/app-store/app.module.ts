import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRootComponent } from './core/root.component';
import { CoreModule } from './core/core.module';
import { Angulartics2Module } from 'angulartics2';
import { environment } from './environments/environment';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { MenuModule } from '../shared/menu/menu.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CheckForUpdateService } from '../shared/pwa/shared/check-for-update.service';
import { RouterModule } from '@angular/router';

registerLocaleData(localeFr);
registerLocaleData(localeEn);

@NgModule({
  imports: [
    Angulartics2Module.forRoot({
      developerMode: !environment.production,
    }),
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: environment.firebase.projectId}),
    CommonModule,
    CoreModule.forRoot(environment),
    MenuModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    TransferHttpCacheModule,
  ],
  declarations: [
    AppRootComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    CheckForUpdateService,
  ]
})
export class AppModule {
}
