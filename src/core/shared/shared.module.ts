import { InjectionToken, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nService } from './i18n/i18n.service';
import { DeviceService } from './device/device.service';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule,
  MatExpansionModule,
  MatStepperModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { SlackModule } from './slack/slack.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { AdsenseModule } from 'ng2-adsense';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Environment } from './util/environment';

export const production = new InjectionToken < string > ('production');
export const site_name = new InjectionToken < string > ('site_name');
export const app_name = new InjectionToken < string > ('app_name');
export const firebase = new InjectionToken < FirebaseAppConfig > ('firebase');
// export const apiKey = new InjectionToken < string > ('apiKey');
// export const authDomain = new InjectionToken < string > ('authDomain');
// export const databaseURL = new InjectionToken < string > ('databaseURL');
// export const projectId = new InjectionToken < string > ('projectId');
// export const storageBucket = new InjectionToken < string > ('storageBucket');
// export const messagingSenderId = new InjectionToken < string > ('messagingSenderId');
export const cloudinaryApiKey = new InjectionToken < string > ('cloudinaryApiKey');
export const cloudinaryApiSecret = new InjectionToken < string > ('cloudinaryApiSecret');
export const cloundinaryUrl = new InjectionToken < string > ('cloundinaryUrl');
export const cloudName = new InjectionToken < string > ('cloudName');
export const uploadPreset = new InjectionToken < string > ('uploadPreset');
export const clientAdSense = new InjectionToken < string > ('clientAdSense');
export const slotAdSense = new InjectionToken < string > ('slotAdSense');
export const slackToken = new InjectionToken < string > ('slackToken');
export const facebook_app_id = new InjectionToken < string > ('facebook_app_id');

export function createTranslateLoader(http: HttpClient, name: string) {
  return new TranslateHttpLoader(http, `./assets/i18n/${name}/`, '.json');
}

@NgModule({
  imports: [
    AdsenseModule.forRoot({
      adClient: clientAdSense.toString(),
      adSlot: slotAdSense.toString()
    }),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB1K9_bZJDLq48C-4xAUhNEjP79Q-60YKw',
      authDomain: 'mon-pull-moche.firebaseapp.com',
      databaseURL: 'https://mon-pull-moche.firebaseio.com',
      projectId: 'mon-pull-moche',
      storageBucket: 'mon-pull-moche.appspot.com',
      messagingSenderId: '1050522744023'
    }, 'monpullmoche'),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBH-ZNbK4pNUuyi_qBb21xe7eQtZhAy0T0',
      authDomain: 'hockey-f2b77.firebaseapp.com',
      databaseURL: 'https://hockey-f2b77.firebaseio.com',
      projectId: 'hockey-f2b77',
      storageBucket: 'hockey-f2b77.appspot.com',
      messagingSenderId: '624874820850'
    }, 'hockey'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    HttpModule,
    CommonModule,
    HttpClientModule,
    SlackModule.forRoot(slackToken),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, app_name]
      }
    }),
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatStepperModule,
    RouterModule,
  ],
  exports: [
    SlackModule,
    TranslateModule,
    SidenavComponent,
    MenuComponent,
    FooterComponent,
    AlertComponent,
    LoaderComponent,
  ],
  declarations: [
    SidenavComponent,
    MenuComponent,
    FooterComponent,
    AlertComponent,
    LoaderComponent,
  ],
  providers: [
    I18nService,
    DeviceService
  ]
})
export class SharedModule {
  static forRoot(config: Environment): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: production, useValue: config.production },
        { provide: site_name, useValue: config.site_name },
        { provide: app_name, useValue: config.app_name },
        { provide: firebase, useValue: config.firebase },
      ]
    };
  }
}
