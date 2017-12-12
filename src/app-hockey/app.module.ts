import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './root/root.component';

import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgStringPipesModule } from 'angular-pipes';
import { SidenavService } from '../core/shared/sidenav/sidenav.service';

import { environment } from './../environments/environment.hockey';

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
import { AdsenseModule } from 'ng2-adsense';

import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './../core/shared/shared.module';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../core/shared/product/product.service';
import { MediaService } from '../core/shared/media/media.service';
import { NotificationService } from '../core/shared/slack/notification.service';
import { UserService } from '../core/shared/user/user.service';
import { LoaderService } from '../core/shared/loader/loader.service';
import { AlertService } from '../core/shared/alert/alert.service';
import { ObjectService } from '../core/shared/util/object.service';
import { DateService } from '../core/shared/util/date.service';
import { ScoreService } from '../core/shared/score/score.service';
import { UserGuard } from '../core/shared/guard/user.guard';
import { ProductListModule } from './product-list/product-list.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {FirebaseAppName, FirebaseAppProvider} from 'angularfire2';

declare var Hammer: any;

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      // Add scroll auto on y. Pan-y can activate swipe left and right too
      touchAction: 'pan-y'
    });
    return mc;
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/' + environment.app_name + '/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    NgStringPipesModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBH-ZNbK4pNUuyi_qBb21xe7eQtZhAy0T0',
      authDomain: 'hockey-f2b77.firebaseapp.com',
      databaseURL: 'https://hockey-f2b77.firebaseio.com',
      projectId: 'hockey-f2b77',
      storageBucket: 'hockey-f2b77.appspot.com',
      messagingSenderId: '624874820850'
    }, 'hockey'),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    AdsenseModule.forRoot({
      adClient: environment.clientAdSense,
      adSlot: environment.slotAdSense
    }),
    ModalModule.forRoot(),
    ImageCropperModule,
    FileUploadModule,
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
    AppRoutingModule,
    ReactiveFormsModule,
    ProductListModule,
    SharedModule.forRoot(environment),
    AppRoutingModule
  ],
  declarations: [
    AppRootComponent
  ],
  bootstrap: [
    AppRootComponent
  ],
  providers: [{
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ]
})
export class AppModule {}
