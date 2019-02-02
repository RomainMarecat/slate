import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryComponent } from './category/category.component';
import { AttributeComponent } from './attribute/attribute.component';
import { PriceComponent } from './price/price.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CountryComponent } from './country/country.component';
import { LocationComponent } from './location/location.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductBestSellerComponent } from './product-best-seller/product-best-seller.component';
import { ProductBestScoreComponent } from './product-best-score/product-best-score.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { FilterComponent } from './filter.component';
import {
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSlideToggleModule,
  MatCommonModule
} from '@angular/material';
import { ProductService } from '../../product/shared/product.service';
import { MockProductService } from '../../product/shared/mock-product.service';
import { SortModule } from '../sort/sort.module';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { configureTestSuite } from '../../unit-test/configure-test-suite';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatCommonModule,
        SortModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        FilterComponent,
        CategoryComponent,
        AttributeComponent,
        PriceComponent,
        DeliveryComponent,
        CountryComponent,
        LocationComponent,
        ProductBrandComponent,
        ProductDescriptionComponent,
        ProductBestSellerComponent,
        ProductBestScoreComponent
      ],
      providers: [
        {provide: ProductService, useClass: MockProductService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
