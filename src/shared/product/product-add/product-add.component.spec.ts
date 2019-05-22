import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatStepperModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockSlackNotificationService, SlackNotificationService } from '@romainmarecat/ngx-slack-notification';
import { Angulartics2Module } from 'angulartics2';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-img-cropper';
import { NgPipesModule } from 'ngx-pipes';
import { environment } from '../../../app-store/environments/environment';
import { DeviceService } from '../../device/device.service';
import { I18nService } from '../../i18n/i18n.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { CloudinaryModule } from '../../media/cloudinary/cloudinary.module';
import { MediaModule } from '../../media/media.module';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { DateService } from '../../util/date.service';
import { ObjectService } from '../../util/object.service';
import { MockProductService } from '../shared/mock-product.service';
import { ProductService } from '../shared/product.service';
import { ProductAddComponent } from './product-add.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';

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
        Angulartics2Module.forRoot({
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
        {provide: SlackNotificationService, useClass: MockSlackNotificationService}
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
