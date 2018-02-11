import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatSlideToggleModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
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
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { ProductBestScoreComponent } from './product-best-score/product-best-score.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    SortModule,
    TranslateModule
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
    ProductBestSellerComponent,
    ProductBrandComponent,
    ProductBestScoreComponent,
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
    ProductBestSellerComponent,
    ProductBrandComponent,
    ProductBestScoreComponent,
  ]
})
export class FilterModule {}
