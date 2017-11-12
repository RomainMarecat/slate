import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductImageComponent } from './product-image.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import {
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule
} from '@angular/material';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../../shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from './../../shared/cloudinary/cloudinary-config';
import { ObjectService } from './../../shared/util/object.service';
import { MockMediaService } from './../../shared/media/mock-media.service';
import { MediaService } from './../../shared/media/media.service';

describe('ProductImageComponent', () => {
  let component: ProductImageComponent;
  let fixture: ComponentFixture < ProductImageComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          ImageCropperModule,
          FileUploadModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatFormFieldModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),

        ],
        declarations: [ProductImageComponent],
        providers: [
          ObjectService,
          { provide: MediaService, useClass: MockMediaService },

        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
