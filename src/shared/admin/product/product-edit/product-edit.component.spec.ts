import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditComponent } from './product-edit.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxEditorModule } from 'ngx-editor';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { ObjectService } from '../../../util/object.service';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockNotificationService } from '../../../slack/mock-notification.service';
import { UserService } from '../../../user/shared/user.service';
import { I18nService } from '../../../i18n/i18n.service';
import { DateService } from '../../../util/date.service';
import { MockUserService } from '../../../user/shared/mock-user.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { DeviceService } from '../../../device/device.service';
import { NotificationService } from '../../../slack/notification.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { CategoryService } from '../../../category/category.service';
import { MockCategoryService } from '../../../category/mock-category.service';
import { AttributeService } from '../../../attribute/attribute.service';
import { MockAttributeService } from '../../../attribute/mock-attribute.service';
import { OfferService } from '../../shared/offer/offer.service';
import { MockOfferService } from '../../shared/offer/mock-offer.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductImageOrderComponent } from '../product-image-order/product-image-order.component';
import { CloudinaryModule } from '../../../media/cloudinary/cloudinary.module';
import { Cloudinary } from 'cloudinary-core';
import { environment } from '../../../../app-hockey/environments/environment';
import { MockPartnerService } from 'shared/partner/mock-partner.service';
import { PartnerService } from 'shared/partner/partner.service';
import { MockProductService } from '../../../product/shared/mock-product.service';
import { ProductService } from '../../../product/shared/product.service';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        BrowserModule,
        BrowserAnimationsModule,
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        NgxDatatableModule,
        NgxEditorModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        ProductEditComponent,
        ProductImageOrderComponent,
      ],
      providers: [
        {provide: AttributeService, useClass: MockAttributeService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: NotificationService, useClass: MockNotificationService},
        {provide: PartnerService, useClass: MockPartnerService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ProductService, useClass: MockProductService},
        {provide: UserService, useClass: MockUserService},
        DateService,
        ObjectService,
        I18nService,
        DeviceService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
