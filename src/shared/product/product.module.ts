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
import { ProductListComponent } from 'shared/product/product-list/product-list.component';
import { ProductDetailComponent } from 'shared/product/product-detail/product-detail.component';
import { ProductItemComponent } from 'shared/product/product-item/product-item.component';
import { ProductAddComponent } from 'shared/product/product-add/product-add.component';
import { ProductFormComponent } from 'shared/product/product-add/product-form/product-form.component';
import { ProductPreviewComponent } from 'shared/product/product-add/product-preview/product-preview.component';
import { ProductActionComponent } from 'shared/product/product-action/product-action.component';
import { ProductService } from 'shared/product/shared/product.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductRoutingModule } from 'shared/product/product-routing.module';
import { Angulartics2Module } from 'angulartics2';
import { MediaModule } from 'shared/media/media.module';
import { NgStringPipesModule } from 'ngx-pipes';
import { ScoreService } from 'shared/score/score.service';
import { LoaderModule } from 'shared/loader/loader.module';

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
