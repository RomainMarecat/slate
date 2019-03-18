import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angulartics2Module } from 'angulartics2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderModule } from '../loader/loader.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { MediaModule } from '../media/media.module';
import { NgStringPipesModule } from 'ngx-pipes';
import { TranslateModule } from '@ngx-translate/core';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemCardComponent } from './product-item-card/product-item-card.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductFormComponent } from './product-add/product-form/product-form.component';
import { ProductPreviewComponent } from './product-add/product-preview/product-preview.component';
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    LoaderModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MediaModule,
    NgStringPipesModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RouterModule,
    LocalizeRouterModule
  ],
  declarations: [
    ProductSearchComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemCardComponent,
    ProductItemComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductActionComponent,
    ProductComponent,
  ],
  exports: [
    ProductSearchComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemCardComponent,
    ProductItemComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductActionComponent,
  ],
})
export class SharedProductModule {
}
