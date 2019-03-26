import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferEditComponent } from './offer-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { MockCategoryService } from '../../../shared/category/mock-category.service';
import { CategoryService } from '../../../shared/category/category.service';
import { RangePipe } from 'ngx-pipes';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { OfferService } from '../../../shared/offer/offer.service';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockOfferService } from '../../../shared/offer/mock-offer.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { GeocodeService } from '../../../shared/map/shared/geocode.service';
import { MockGeocodeService } from '../../../shared/map/shared/mock-geocode.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { DeviceService } from '../../../shared/device/device.service';
import { MockMapsAPILoader } from '../../../shared/map/shared/mock-maps-api-loader';
import { environment } from '../../environments/environment';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { MediaService } from '../../../shared/media/media.service';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';

describe('OfferEditComponent', () => {
  let component: OfferEditComponent;
  let fixture: ComponentFixture<OfferEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapApiKey
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule
      ],
      declarations: [OfferEditComponent],
      providers: [
        DeviceService,
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ProductService, useClass: MockProductService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: GeocodeService, useClass: MockGeocodeService},
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
        RangePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
