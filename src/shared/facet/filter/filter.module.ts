import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

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
