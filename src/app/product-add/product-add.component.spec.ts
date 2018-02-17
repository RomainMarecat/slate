import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { ImageCropperModule } from 'ngx-img-cropper';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../shared/cloudinary/cloudinary.module';
import { MockProductService } from '../../shared/product/mock-product.service';
import { ProductService } from '../../shared/product/product.service';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ProductImageComponent } from '../../shared/product/product-image/product-image.component';
import { ProductAddComponent } from './product-add.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockUserService } from '../../shared/user/mock-user.service';
import { UserService } from '../../shared/user/user.service';
import { ObjectService } from '../../shared/util/object.service';
import { MediaService } from '../../shared/media/media.service';
import { MockMediaService } from '../../shared/media/mock-media.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MockLoaderService } from '../../shared/loader/mock-loader.service';
import { DateService } from '../../shared/util/date.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { NotificationService } from '../../shared/slack/notification.service';
import { SlackModule } from '../../shared/slack/slack.module';
import { DeviceService } from '../../shared/device/device.service';
import { environment } from './../../environments/environment.monpullmoche';
import { MockNotificationService } from '../../shared/slack/mock-notification.service';
import { NgPipesModule } from 'ngx-pipes';

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
          HttpClientModule,
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
          NgPipesModule,
          FileUploadModule,
          ImageCropperModule,
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
          ProductAddComponent,
          ProductImageComponent,
          ProductPreviewComponent,
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
