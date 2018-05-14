import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxEditorModule } from 'ngx-editor';
import { MockProductService } from '../../shared/product/mock-product.service';
import { ProductService } from '../../shared/product/product.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { Cloudinary } from 'cloudinary-core';
import { ObjectService } from '../../../util/object.service';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockNotificationService } from '../../../slack/mock-notification.service';
import { UserService } from '../../../user/user.service';
import { I18nService } from '../../../i18n/i18n.service';
import { DateService } from '../../../util/date.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { DeviceService } from '../../../device/device.service';
import { NotificationService } from '../../../slack/notification.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { CategoryService } from '../../../category/category.service';
import { MockCategoryService } from '../../../category/mock-category.service';
import { AttributeService } from '../../../attribute/attribute.service';
import { MockAttributeService } from '../../../attribute/mock-attribute.service';

import { AttributeEditComponent } from './attribute-edit.component';
import { CloudinaryModule } from '../../../media/cloudinary/cloudinary.module';
import { MockUserService } from '../../../user/mock-user.service';
import { environment } from '../../../../app-hockey/environments/environment';

describe('AttributeEditComponent', () => {
  let component: AttributeEditComponent;
  let fixture: ComponentFixture < AttributeEditComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpClientModule,
          FormsModule,
          RouterTestingModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, environment.cloudinary),
          SharedModule,
          NgxEditorModule,
          NgxDatatableModule,
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),

        ],
        declarations: [AttributeEditComponent],
        providers: [
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: UserService, useClass: MockUserService },
          { provide: MediaService, useClass: MockMediaService },
          { provide: CategoryService, useClass: MockCategoryService },
          { provide: ProductService, useClass: MockProductService },
          { provide: NotificationService, useClass: MockNotificationService },
          { provide: AttributeService, useClass: MockAttributeService },
          DateService,
          ObjectService,
          I18nService,
          DeviceService,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
