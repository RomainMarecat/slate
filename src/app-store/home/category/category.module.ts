import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedCategoryModule } from '../../../shared/category/shared-category.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CategoryListComponent,
  ],
  exports: [
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedCategoryModule,
    TranslateModule.forChild()
  ],
})
export class CategoryModule {
}
