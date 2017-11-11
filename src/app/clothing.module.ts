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
import { UserService } from './shared/user/user.service';
import { ScoreService } from './shared/score/score.service';
import { LoaderService } from './shared/loader/loader.service';
import { SidenavService } from './shared/sidenav/sidenav.service';
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
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule
} from '@angular/material';
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
import { ClothingActionComponent } from './clothing-item/clothing-action/clothing-action.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert/alert.service';
import { AdminModule } from './admin/admin.module';
import { UserGuard } from './shared/guard/user.guard';
import { LoaderComponent } from './shared/loader/loader.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

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
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    AdsenseModule.forRoot({
      adClient: environment.clientAdSense,
      adSlot: environment.slotAdSense
    }),
    AdminModule,
    ClothingRoutingModule
  ],
  entryComponents: [
    AlertComponent
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
    ClothingActionComponent,
    AlertComponent,
    LoaderComponent,
    SidenavComponent,
  ],
  providers: [
    ClothingService,
    MediaService,
    UserService,
    AlertService,
    ObjectService,
    LoaderService,
    ScoreService,
    SidenavService,
    UserGuard
  ],
  bootstrap: [
    ClothingComponent
  ]
})
export class ClothingModule {}
