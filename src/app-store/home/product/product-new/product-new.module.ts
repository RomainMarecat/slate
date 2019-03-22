import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductNewerComponent } from './product-newer/product-newer.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { PopupModule } from '../../../../shared/popup/popup.module';
import { SharedProductModule } from '../../../../shared/product/shared-product.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    ProductNewerComponent
  ],
  exports: [
    ProductNewerComponent,
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
export class ProductNewModule {
}
