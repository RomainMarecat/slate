import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search/product-search.component';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatSelectModule, MatStepperModule, MatExpansionModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';
import { Angulartics2Module } from 'angulartics2';
import { NgStringPipesModule } from 'ngx-pipes';
import { LoaderModule } from '../loader/loader.module';
import { MediaModule } from '../media/media.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-add/product-form/product-form.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductPreviewComponent } from './product-add/product-preview/product-preview.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ScoreService } from '../score/score.service';
import { ProductService } from './shared/product.service';
import { ProductComponent } from './product/product.component';

export const TABLE_PRODUCT = new InjectionToken<string>('product');
export const TABLE_SCORE = new InjectionToken<string>('score');

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    LoaderModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatExpansionModule,
    MediaModule,
    NgStringPipesModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductSearchComponent,
    ProductListComponent,
    ProductDetailComponent,
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
    ProductItemComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductActionComponent,
  ],
  providers: [
    {provide: TABLE_SCORE, useValue: 'score'},
    {provide: ScoreService, useClass: ScoreService, deps: [AngularFirestore, TABLE_SCORE]},
    {provide: TABLE_PRODUCT, useValue: 'product'},
    {provide: ProductService, useClass: ProductService, deps: [AngularFirestore, TABLE_PRODUCT]},
  ]
})
export class ProductModule {
}
