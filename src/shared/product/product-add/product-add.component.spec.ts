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
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatExpansionModule,
  MatStepperModule,
} from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-img-cropper';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../media/cloudinary/cloudinary.module';
import { MockProductService } from '../shared/mock-product.service';
import { ProductService } from '../shared/product.service';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ProductAddComponent } from './product-add.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { ObjectService } from '../../util/object.service';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { DateService } from '../../util/date.service';
import { I18nService } from '../../i18n/i18n.service';
import { NotificationService } from '../../slack/notification.service';
import { DeviceService } from '../../device/device.service';
import { MockNotificationService } from '../../slack/mock-notification.service';
import { NgPipesModule } from 'ngx-pipes';
import { MediaModule } from '../../media/media.module';
import { environment } from '../../../app-ecommerce/environments/environment';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;

  configureTestSuite();

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
        MediaModule,
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        ProductAddComponent,
        ProductPreviewComponent,
        ProductFormComponent
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: UserService, useClass: MockUserService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: ProductService, useClass: MockProductService},
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
