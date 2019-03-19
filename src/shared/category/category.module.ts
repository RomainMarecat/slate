import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryComponent } from './category/category.component';
import { SharedProductModule } from '../product/shared-product.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedCategoryModule } from './shared-category.module';

@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoryComponent
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    SharedCategoryModule,
    SharedProductModule,
    CategoryRoutingModule,
    TranslateModule.forChild()
  ]
})
export class CategoryModule {
}
