import { NgModule, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgStringPipesModule } from 'angular-pipes';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductService } from './shared/product/product.service';
import { MediaService } from './shared/media/media.service';
import { UserService } from './shared/user/user.service';
import { ScoreService } from './shared/score/score.service';
import { LoaderService } from './shared/loader/loader.service';
import { SidenavService } from './shared/sidenav/sidenav.service';
import { ObjectService } from './shared/util/object.service';
import { DateService } from './shared/util/date.service';

import { environment } from './../environments/environment';
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
  MatTooltipModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AdsenseModule } from 'ng2-adsense';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from './shared/cloudinary/cloudinary-config';

import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductComponent } from './product/product.component';
import { ProductImageComponent } from './product-add/product-image/product-image.component';
import { ProductFormComponent } from './shared/product/product-form/product-form.component';
import { ProductPreviewComponent } from './product-add/product-preview/product-preview.component';
import { ImageComponent } from './shared/cloudinary/image/image.component';
import { ProductActionComponent } from './product-item/product-action/product-action.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert/alert.service';
import { AdminModule } from './admin/admin.module';
import { UserGuard } from './shared/guard/user.guard';
import { LoaderComponent } from './shared/loader/loader.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';

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
    ReactiveFormsModule,
    CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgStringPipesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
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
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
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
    AdminModule,
    ProductRoutingModule
  ],
  entryComponents: [
    AlertComponent
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    MenuComponent,
    FooterComponent,
    ProductItemComponent,
    ProductAddComponent,
    ProductComponent,
    ProductImageComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ImageComponent,
    ProductActionComponent,
    AlertComponent,
    LoaderComponent,
    SidenavComponent,
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
  ],
  bootstrap: [
    ProductComponent
  ]
})
export class ProductModule {}
