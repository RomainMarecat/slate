import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryItemComponent } from './category-item/category-item.component';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { MatIconModule } from '@angular/material';
import { StorageModule } from '../../../shared/media/storage/storage.module';
import { CategoryService } from '../../../shared/category/category.service';
import { MockCategoryService } from '../../../shared/category/mock-category.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryItemComponent
  ],
  exports: [
    CategoryListComponent,
    CategoryItemComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule,
    StorageModule,
    TranslateModule.forChild(),
    LocalizeRouterModule
  ],
  providers: [
    {provide: CategoryService, useClass: MockCategoryService} // @todo to remove
  ]
})
export class CategoryModule {
}
