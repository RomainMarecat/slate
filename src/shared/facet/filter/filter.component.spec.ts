import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CategoryComponent } from './category/category.component';
import { AttributeComponent } from './attribute/attribute.component';
import { PriceComponent } from './price/price.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CountryComponent } from './country/country.component';
import { LocationComponent } from './location/location.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductBestSellerComponent } from './product-best-seller/product-best-seller.component';
import { FilterComponent } from './filter.component';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductService } from '../../../shared/product/product.service';
import { MockProductService } from '../../../shared/product/mock-product.service';


describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture < FilterComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MatListModule
        ],
        declarations: [
          FilterComponent,
          CategoryComponent,
          AttributeComponent,
          PriceComponent,
          DeliveryComponent,
          CountryComponent,
          LocationComponent,
          ProductDescriptionComponent,
          ProductBestSellerComponent
        ],
        providers: [
          { provide: ProductService, useClass: MockProductService },
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
