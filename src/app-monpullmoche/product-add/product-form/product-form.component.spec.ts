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
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../shared/media/cloudinary/cloudinary.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageProductComponent } from '../../../shared/media/cloudinary/image-product/image-product.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-img-cropper';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockUserService } from '../../../shared/user/mock-user.service';
import { UserService } from '../../../shared/user/user.service';
import { ObjectService } from '../../../shared/util/object.service';
import { MediaService } from '../../../shared/media/media.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { DeviceService } from '../../../shared/device/device.service';
import { environment } from '../../../environments/environment.monpullmoche';
import { MediaModule } from '../../../shared/media/media.module';

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
          MediaModule,
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
