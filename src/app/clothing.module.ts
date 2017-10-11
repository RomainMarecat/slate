import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ClothingRoutingModule } from './clothing-routing.module';
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClothingDetailComponent } from './clothing-detail/clothing-detail.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ClothingItemComponent } from './clothing-item/clothing-item.component';
import { ClothingService } from './shared/clothing.service';
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
  MatCheckboxModule
} from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClothingAddComponent } from './clothing-add/clothing-add.component';
import { ClothingComponent } from './clothing/clothing.component';
import { ClothingImageComponent } from './clothing-add/clothing-image/clothing-image.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ModalModule.forRoot(),
    ImageCropperModule,
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
  ],
  providers: [
    ClothingService
  ],
  bootstrap: [
    ClothingComponent
  ]
})
export class ClothingModule {}
