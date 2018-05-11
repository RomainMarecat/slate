import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferConfirmationComponent } from './offer-confirmation.component';
import { OfferEditComponent } from '../offer-edit/offer-edit.component';
import { environment } from '../../../environments/environment.car';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockGeocodeService } from '../../../shared/map/shared/mock-geocode.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from 'angularfire2';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { MockOfferService } from '../../../shared/offer/mock-offer.service';
import { RangePipe } from 'ngx-pipes';
import { ProductService } from '../../../shared/product/product.service';
import { CategoryService } from '../../../shared/category/category.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfferService } from '../../../shared/offer/offer.service';
import { GeocodeService } from '../../../shared/map/shared/geocode.service';
import { MockCategoryService } from '../../../shared/category/mock-category.service';
import { SharedModule } from '../../../shared/shared.module';
import { DeviceService } from '../../../shared/device/device.service';
import { MockMapsAPILoader } from '../../../shared/map/shared/mock-maps-api-loader';

describe('OfferConfirmationComponent', () => {
  let component: OfferConfirmationComponent;
  let fixture: ComponentFixture<OfferConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapApiKey
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
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
      declarations: [ OfferConfirmationComponent ],
      providers: [
        DeviceService,
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ProductService, useClass: MockProductService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: GeocodeService, useClass: MockGeocodeService},
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
        RangePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
