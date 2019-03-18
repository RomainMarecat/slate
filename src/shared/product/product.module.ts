import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search/product-search.component';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatSelectModule, MatStepperModule, MatExpansionModule, MatListModule, MatTooltipModule, MatSnackBarModule
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
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductPreviewComponent } from './product-add/product-preview/product-preview.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ScoreService } from '../score/score.service';
import { ProductService } from './shared/product.service';
import { ProductComponent } from './product/product.component';
import { MockProductService } from './shared/mock-product.service';
import { ProductItemCardComponent } from './product-item-card/product-item-card.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedProductModule } from './shared-product.module';

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
    SharedProductModule,
    ProductRoutingModule
  ],
  providers: [
    {provide: TABLE_SCORE, useValue: 'score'},
    {provide: ScoreService, useClass: ScoreService, deps: [AngularFirestore, TABLE_SCORE]},
    {provide: TABLE_PRODUCT, useValue: 'product'},
    {provide: ProductService, useClass: ProductService, deps: [AngularFirestore, TABLE_PRODUCT]},
    {provide: ProductService, useClass: MockProductService}, // @todo remove mock
  ]
})
export class SharedProductWithRoutesModule {
}
