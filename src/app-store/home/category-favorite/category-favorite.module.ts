import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedCategoryModule } from '../../../shared/category/shared-category.module';
import { TranslateModule } from '@ngx-translate/core';

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
export class CategoryFavoriteModule {
}
