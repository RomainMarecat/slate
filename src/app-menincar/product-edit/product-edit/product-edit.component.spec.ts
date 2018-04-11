import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditComponent } from './product-edit.component';
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
import { ProductService } from '../../../shared/product/product.service';
import { MockOfferService } from '../../../shared/offer/mock-offer.service';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment.menincar';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapApiKey
        }),
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule
      ],
      declarations: [ ProductEditComponent ],
      providers: [
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ProductService, useClass: MockProductService},
        {provide: AlertService, useClass: MockAlertService},
        RangePipe
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
