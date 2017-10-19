import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { NgStringPipesModule } from 'angular-pipes';
import { ClothingRoutingModule } from './clothing-routing.module';
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClothingDetailComponent } from './clothing-detail/clothing-detail.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ClothingItemComponent } from './clothing-item/clothing-item.component';
import { ClothingService } from './shared/clothing/clothing.service';
import { MediaService } from './shared/media/media.service';
import { ObjectService } from './shared/util/object.service';

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
} from '@angular/material';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { AdsenseModule } from 'ng2-adsense';

import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClothingAddComponent } from './clothing-add/clothing-add.component';
import { ClothingComponent } from './clothing/clothing.component';
import { ClothingImageComponent } from './clothing-add/clothing-image/clothing-image.component';
import { CloudinaryConfig } from './shared/cloudinary/cloudinary-config';
import { ClothingFormComponent } from './shared/clothing/clothing-form/clothing-form.component';
import { ClothingPreviewComponent } from './clothing-add/clothing-preview/clothing-preview.component';
import { ImageComponent } from './shared/cloudinary/image/image.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgStringPipesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ModalModule.forRoot(),
    CloudinaryModule.forRoot(cloudinaryLib, CloudinaryConfig),
    ImageCropperModule,
    FileUploadModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    Ng2PageScrollModule,
    AdsenseModule.forRoot({
      adClient: environment.clientAdSense,
      adSlot: environment.slotAdSense
    }),
    ClothingRoutingModule
  ],
  declarations: [
    ClothingListComponent,
    ClothingDetailComponent,
    MenuComponent,
    FooterComponent,
    ClothingItemComponent,
    ClothingAddComponent,
    ClothingComponent,
    ClothingImageComponent,
    ClothingFormComponent,
    ClothingPreviewComponent,
    ImageComponent,
    ComingSoonComponent,
  ],
  providers: [
    ClothingService,
    MediaService,
    ObjectService
  ],
  bootstrap: [
    ClothingComponent
  ]
})
export class ClothingModule {}
