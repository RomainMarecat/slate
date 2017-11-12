import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
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
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../../cloudinary/cloudinary.module';
import { CloudinaryConfig } from './../../cloudinary/cloudinary-config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductImageComponent } from './../../../product-add/product-image/product-image.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { MockAlertService } from './../../alert/mock-alert.service';
import { AlertService } from './../../alert/alert.service';
import { MockUserService } from './../../user/mock-user.service';
import { UserService } from './../../user/user.service';
import { ObjectService } from './../../util/object.service';
import { MediaService } from './../../media/media.service';
import { MockMediaService } from './../../media/mock-media.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture < ProductFormComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpModule,
          FormsModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          BrowserModule,
          FileUploadModule,
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
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
        ],
        declarations: [
          ProductFormComponent,
          ProductImageComponent
        ],
        providers: [
          { provide: AlertService, useClass: MockAlertService },
          { provide: UserService, useClass: MockUserService },
          { provide: MediaService, useClass: MockMediaService },
          ObjectService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
