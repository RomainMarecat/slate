import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedProductModule } from '../../../../shared/product/shared-product.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule } from 'localize-router';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { PopupModule } from '../../../../shared/popup/popup.module';
import { RouterModule } from '@angular/router';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  exports: [
    ProductListComponent,
    SharedProductModule,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LocalizeRouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    NgPipesModule,
    PopupModule,
    RouterModule,
    StorageModule,
    SharedProductModule,
    TranslateModule.forChild(),
  ],
})
export class ProductListModule {
}
