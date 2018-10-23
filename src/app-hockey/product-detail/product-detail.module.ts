import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductAttributeComponent } from './product-attribute/product-attribute.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { CommentModule } from 'shared/comment/comment.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommentModule,
    ProductDetailRoutingModule
  ],
  declarations: [
    ProductDetailComponent,
    ProductActionComponent,
    ProductAttributeComponent,
    ProductDescriptionComponent
  ]
})
export class ProductDetailModule {
}
