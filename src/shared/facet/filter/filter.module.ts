import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatListModule, MatButtonModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortModule } from './../sort/sort.module';
import { FilterComponent } from './filter.component';
import { CategoryComponent } from './category/category.component';
import { AttributeComponent } from './attribute/attribute.component';
import { PriceComponent } from './price/price.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CountryComponent } from './country/country.component';
import { LocationComponent } from './location/location.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductBestSellerComponent } from './product-best-seller/product-best-seller.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    SortModule,
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
