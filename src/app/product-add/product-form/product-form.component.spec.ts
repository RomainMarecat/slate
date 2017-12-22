import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
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
  MatTooltipModule,
  MatStepperModule,
  MatExpansionModule
} from '@angular/material';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../core/shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../../core/shared/cloudinary/cloudinary-config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductImageComponent } from '../../../core/shared/product/product-image/product-image.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { MockAlertService } from './../../../core/shared/alert/mock-alert.service';
import { AlertService } from '../../../core/shared/alert/alert.service';
import { MockUserService } from '../../../core/shared/user/mock-user.service';
import { UserService } from '../../../core/shared/user/user.service';
import { ObjectService } from '../../../core/shared/util/object.service';
import { MediaService } from '../../../core/shared/media/media.service';
import { MockMediaService } from '../../../core/shared/media/mock-media.service';
import { DeviceService } from '../../../core/shared/device/device.service';
import { environment } from './../../../environments/environment.monpullmoche';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture < ProductFormComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          HttpClientModule,
          FormsModule,
          RouterTestingModule,
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
          MatTooltipModule,
          MatStepperModule,
          MatExpansionModule,
          MatCheckboxModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, environment.cloudinary),
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
        declarations: [
          ProductFormComponent,
          ProductImageComponent
        ],
        providers: [
          { provide: AlertService, useClass: MockAlertService },
          { provide: UserService, useClass: MockUserService },
          { provide: MediaService, useClass: MockMediaService },
          ObjectService,
          DeviceService
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
