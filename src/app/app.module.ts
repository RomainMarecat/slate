import { NgModule, Injectable, InjectionToken } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductService } from '../core/shared/product/product.service';
import { MediaService } from '../core/shared/media/media.service';
import { UserService } from '../core/shared/user/user.service';
import { ScoreService } from '../core/shared/score/score.service';
import { LoaderService } from '../core/shared/loader/loader.service';
import { SidenavService } from '../core/shared/sidenav/sidenav.service';
import { ObjectService } from '../core/shared/util/object.service';
import { DateService } from '../core/shared/util/date.service';

import { environment } from './../environments/environment.monpullmoche';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
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
import { SharedModule } from '../core/shared/shared.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { AppRootComponent } from './root/root.component';
import { ProductImageComponent } from './product-add/product-image/product-image.component';
import { ProductFormComponent } from './product-add/product-form/product-form.component';
import { ProductPreviewComponent } from './product-add/product-preview/product-preview.component';
import { ProductActionComponent } from './product-item/product-action/product-action.component';
import { AlertComponent } from '../core/shared/alert/alert.component';
import { AlertService } from '../core/shared/alert/alert.service';
import { UserGuard } from '../core/shared/guard/user.guard';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { NgStringPipesModule } from 'angular-pipes';
import { NotificationService } from '../core/shared/slack/notification.service';
import { AppRoutingModule } from './app-routing.module';
import { Environment } from './../core/shared/util/environment';

declare var Hammer: any;

export const APP_NAME = new InjectionToken<string>(environment.app_name);

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

@NgModule({
  imports: [
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB1K9_bZJDLq48C-4xAUhNEjP79Q-60YKw',
      authDomain: 'mon-pull-moche.firebaseapp.com',
      databaseURL: 'https://mon-pull-moche.firebaseio.com',
      projectId: 'mon-pull-moche',
      storageBucket: 'mon-pull-moche.appspot.com',
      messagingSenderId: '1050522744023'
    }, 'monpullmoche'),
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
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
    NgStringPipesModule,
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
    ReactiveFormsModule,
    SharedModule.forRoot(environment),
    AppRoutingModule,
  ],
  entryComponents: [
    AlertComponent
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductAddComponent,
    AppRootComponent,
    ProductImageComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductActionComponent,
  ],
  providers: [
    { provide: APP_NAME, useValue: APP_NAME },
    {
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ],
  bootstrap: [
    AppRootComponent
  ]
})
export class AppModule {}
