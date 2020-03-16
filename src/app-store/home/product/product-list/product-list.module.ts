import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedProductModule } from '../../../../shared/product/shared-product.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule } from 'localize-router';
import { NgPipesModule } from 'ngx-pipes';
import { PopupModule } from '../../../../shared/popup/popup.module';
import { RouterModule } from '@angular/router';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
