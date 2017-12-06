import { NgModule, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgStringPipesModule } from 'angular-pipes';
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
import { AngularFirestoreModule } from 'angularfire2/firestore';
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
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../core/shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../core/shared/cloudinary/cloudinary-config';

import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../core/shared/shared.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { AppRootComponent } from './root/root.component';
import { ProductImageComponent } from './product-add/product-image/product-image.component';
import { ProductFormComponent } from './product-add/product-form/product-form.component';
import { ProductPreviewComponent } from './product-add/product-preview/product-preview.component';
import { ImageComponent } from '../core/shared/cloudinary/image/image.component';
import { ProductActionComponent } from './product-item/product-action/product-action.component';
import { AlertComponent } from '../core/shared/alert/alert.component';
import { AlertService } from '../core/shared/alert/alert.service';
import { UserGuard } from '../core/shared/guard/user.guard';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { NotificationService } from '../core/shared/slack/notification.service';
import { AppRoutingModule } from './app-routing.module';

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

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgStringPipesModule,
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
    ImageComponent,
    ProductActionComponent,
  ],
  providers: [
    ProductService,
    MediaService,
    UserService,
    AlertService,
    ObjectService,
    DateService,
    LoaderService,
    ScoreService,
    SidenavService,
    UserGuard,
    {
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    NotificationService
  ],
  bootstrap: [
    AppRootComponent
  ]
})
export class AppModule {}
