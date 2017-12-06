import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
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
  MatTooltipModule,
  MatExpansionModule,
  MatStepperModule,
} from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgStringPipesModule } from 'angular-pipes';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../core/shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../core/shared/cloudinary/cloudinary-config';
import { MockProductService } from '../../core/shared/product/mock-product.service';
import { ProductService } from '../../core/shared/product/product.service';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { ImageComponent } from '../../core/shared/cloudinary/image/image.component';
import { ProductAddComponent } from './product-add.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MockAlertService } from '../../core/shared/alert/mock-alert.service';
import { AlertService } from '../../core/shared/alert/alert.service';
import { MockUserService } from '../../core/shared/user/mock-user.service';
import { UserService } from '../../core/shared/user/user.service';
import { ObjectService } from '../../core/shared/util/object.service';
import { MediaService } from '../../core/shared/media/media.service';
import { MockMediaService } from '../../core/shared/media/mock-media.service';
import { LoaderService } from '../../core/shared/loader/loader.service';
import { MockLoaderService } from '../../core/shared/loader/mock-loader.service';
import { DateService } from '../../core/shared/util/date.service';
import { I18nService } from '../../core/shared/i18n/i18n.service';
import { NotificationService } from '../../core/shared/slack/notification.service';
import { SlackModule } from '../../core/shared/slack/slack.module';
import { DeviceService } from '../../core/shared/device/device.service';
import { environment } from './../../environments/environment.monpullmoche';
import { MockNotificationService } from '../../core/shared/slack/mock-notification.service';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture < ProductAddComponent > ;
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
          MatStepperModule,
          MatExpansionModule,
          MatListModule,
          NgStringPipesModule,
          FileUploadModule,
          ImageCropperModule,
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
        declarations: [
          ProductAddComponent,
          ProductImageComponent,
          ProductPreviewComponent,
          ImageComponent,
          ProductFormComponent
        ],
        providers: [
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: UserService, useClass: MockUserService },
          { provide: MediaService, useClass: MockMediaService },
          { provide: ProductService, useClass: MockProductService },
          DateService,
          ObjectService,
          I18nService,
          DeviceService,
          {
            provide: NotificationService,
            useClass: MockNotificationService
          }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
