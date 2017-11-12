import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgStringPipesModule } from 'angular-pipes';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from './../shared/cloudinary/cloudinary-config';
import { ClothingActionComponent } from './../clothing-item/clothing-action/clothing-action.component';
import { MockClothingService } from './../shared/clothing/mock-clothing.service';
import { ClothingService } from './../shared/clothing/clothing.service';
import { ClothingPreviewComponent } from './clothing-preview/clothing-preview.component';
import { ClothingImageComponent } from './clothing-image/clothing-image.component';
import { ImageComponent } from './../shared/cloudinary/image/image.component';
import { ClothingAddComponent } from './clothing-add.component';
import { ClothingFormComponent } from './../shared/clothing/clothing-form/clothing-form.component';
import { MockAlertService } from './../shared/alert/mock-alert.service';
import { AlertService } from './../shared/alert/alert.service';
import { MockUserService } from './../shared/user/mock-user.service';
import { UserService } from './../shared/user/user.service';
import { ObjectService } from './../shared/util/object.service';
import { MediaService } from './../shared/media/media.service';
import { MockMediaService } from './../shared/media/mock-media.service';
import { LoaderService } from './../shared/loader/loader.service';
import { MockLoaderService } from './../shared/loader/mock-loader.service';

describe('ClothingAddComponent', () => {
  let component: ClothingAddComponent;
  let fixture: ComponentFixture < ClothingAddComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          HttpModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatInputModule,
          MatCheckboxModule,
          MatListModule,
          NgStringPipesModule,
          FileUploadModule,
          ImageCropperModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
        ],
        declarations: [
          ClothingAddComponent,
          ClothingImageComponent,
          ClothingPreviewComponent,
          ImageComponent,
          ClothingFormComponent
        ],
        providers: [
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: UserService, useClass: MockUserService },
          { provide: MediaService, useClass: MockMediaService },
          { provide: ClothingService, useClass: MockClothingService },
          ObjectService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
