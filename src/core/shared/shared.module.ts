import { InjectionToken, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nService } from './i18n/i18n.service';
import { DeviceService } from './device/device.service';
import { NgStringPipesModule } from 'angular-pipes';²
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
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryConfig } from './cloudinary/cloudinary-config';

import { Environment } from './util/environment';
import {ProductService} from './product/product.service';
import {UserService} from './user/user.service';
import {MediaService} from './media/media.service';
import {AlertService} from './alert/alert.service';
import {ObjectService} from './util/object.service';
import {SidenavService} from './sidenav/sidenav.service';
import {UserGuard} from './guard/user.guard';
import {ScoreService} from './score/score.service';
import {DateService} from './util/date.service';
import {LoaderService} from './loader/loader.service';

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

export function createCloudinaryConfig(cloudinaryApiKey: string,
  cloudinaryApiSecret: string,
  cloudinaryUrl: string,
  cloudName: string) {
  return new CloudinaryConfig(cloudinaryApiKey, cloudinaryApiSecret, cloudinaryUrl, cloudName);
}

@NgModule({
  imports: [
    AdsenseModule.forRoot({
      adClient: clientAdSense.toString(),
      adSlot: slotAdSense.toString()
    }),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    CloudinaryModule.forRoot(
      { Cloudinary: Cloudinary },
      {
        provide: CloudinaryConfig,
        useFactory: (createCloudinaryConfig),
        deps: [cloudinaryApiKey, cloudinaryApiSecret, cloundinaryUrl, cloudName]
      }
    ),
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
    NgStringPipesModule,
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
    CloudinaryModule,
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
    { provide: app_name, useValue: app_name },
    { provide: ProductService, useClass: ProductService, deps: [AngularFirestore, app_name] },
    { provide: MediaService, useClass: MediaService, deps: [AngularFirestore, app_name] },
    UserService,
    AlertService,
    ObjectService,
    DateService,
    LoaderService,
    ScoreService,
    SidenavService,
    UserGuard,
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
