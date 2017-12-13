import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductImageComponent } from './product-image.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import {
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatTooltipModule
} from '@angular/material';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../core/shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../../core/shared/cloudinary/cloudinary-config';
import { ObjectService } from '../../../core/shared/util/object.service';
import { MockMediaService } from '../../../core/shared/media/mock-media.service';
import { MediaService } from '../../../core/shared/media/media.service';
import { DeviceService } from '../../../core/shared/device/device.service';

describe('ProductImageComponent', () => {
  let component: ProductImageComponent;
  let fixture: ComponentFixture < ProductImageComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          ImageCropperModule,
          FileUploadModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatFormFieldModule,
          MatTooltipModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          })
        ],
        declarations: [ProductImageComponent],
        providers: [
          ObjectService,
          { provide: MediaService, useClass: MockMediaService },
          DeviceService
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
