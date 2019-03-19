import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item/category-item.component';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StorageModule } from '../media/storage/storage.module';

@NgModule({
  declarations: [
    CategoryItemComponent
  ],
  exports: [
    CategoryItemComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule,
    StorageModule,
    TranslateModule.forChild()
  ]
})
export class SharedCategoryModule {
}
