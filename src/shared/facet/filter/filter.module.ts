import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { CategoryComponent } from './category/category.component';
import { AttributeComponent } from './attribute/attribute.component';
import { PriceComponent } from './price/price.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CountryComponent } from './country/country.component';
import { LocationComponent } from './location/location.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductBestSellerComponent } from './product-best-seller/product-best-seller.component';
import { MatListModule } from '@angular/material';

@NgModule({
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
  exports: [
    FilterComponent,
    CategoryComponent,
    AttributeComponent,
    PriceComponent,
    DeliveryComponent,
    CountryComponent,
    LocationComponent,
    ProductDescriptionComponent,
    ProductBestSellerComponent
  ]
})
export class FilterModule {}
