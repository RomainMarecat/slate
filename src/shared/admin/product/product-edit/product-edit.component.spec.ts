import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockSlackNotificationService, SlackNotificationService } from '@romainmarecat/ngx-slack-notification';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Angulartics2Module } from 'angulartics2';
import { Cloudinary } from 'cloudinary-core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';

import { environment } from '../../../../app-hockey/environments/environment';
import { AttributeService } from '../../../attribute/attribute.service';
import { MockAttributeService } from '../../../attribute/mock-attribute.service';
import { CategoryService } from '../../../category/category.service';
import { MockCategoryService } from '../../../category/mock-category.service';
import { DeviceService } from '../../../device/device.service';
import { I18nService } from '../../../i18n/i18n.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { CloudinaryModule } from '../../../media/cloudinary/cloudinary.module';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { MockPartnerService } from '../../../partner/mock-partner.service';
import { PartnerService } from '../../../partner/partner.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { MockProductService } from '../../../product/shared/mock-product.service';
import { ProductService } from '../../../product/shared/product.service';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { SharedModule } from '../../../shared.module';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MockUserService } from '../../../user/shared/mock-user.service';
import { UserService } from '../../../user/shared/user.service';
import { DateService } from '../../../util/date.service';
import { ObjectService } from '../../../util/object.service';
import { MockOfferService } from '../../shared/offer/mock-offer.service';
import { OfferService } from '../../shared/offer/offer.service';
import { ProductImageOrderComponent } from '../product-image-order/product-image-order.component';

import { ProductEditComponent } from './product-edit.component';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        BrowserModule,
        BrowserAnimationsModule,
        CloudinaryModule.forRoot({Cloudinary}, environment.cloudinary),
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        NgxDatatableModule,

        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        ProductEditComponent,
        ProductImageOrderComponent,
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: AttributeService, useClass: MockAttributeService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: SlackNotificationService, useClass: MockSlackNotificationService},
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
