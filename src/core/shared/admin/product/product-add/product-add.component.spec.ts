import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddComponent } from './product-add.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxEditorModule } from 'ngx-editor';
import { MockProductService } from '../../shared/product/mock-product.service';
import { ProductService } from '../../shared/product/product.service';
import { AlertService } from '../../../alert/alert.service';
import { MockAlertService } from '../../../alert/mock-alert.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { CloudinaryModule } from '../../../cloudinary/cloudinary.module';
import { Cloudinary } from 'cloudinary-core';
import { environment } from '../../../../../environments/environment.monpullmoche';
import { ObjectService } from '../../../util/object.service';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockNotificationService } from '../../../slack/mock-notification.service';
import { UserService } from '../../../user/user.service';
import { I18nService } from '../../../i18n/i18n.service';
import { DateService } from '../../../util/date.service';
import { MockUserService } from '../../../user/mock-user.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { DeviceService } from '../../../device/device.service';
import { NotificationService } from '../../../slack/notification.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture < ProductAddComponent > ;

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
        declarations: [
          ProductAddComponent
        ],
        providers: [
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: UserService, useClass: MockUserService },
          { provide: MediaService, useClass: MockMediaService },
          { provide: ProductService, useClass: MockProductService },
          { provide: NotificationService, useClass: MockNotificationService },
          DateService,
          ObjectService,
          I18nService,
          DeviceService,
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