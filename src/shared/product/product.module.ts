import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search/product-search.component';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductSearchComponent
  ],
  exports: [
    ProductSearchComponent
  ]
})
export class ProductModule {
}
