import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductNewerComponent } from './product-newer/product-newer.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './product-item/product-item.component';
import { FavoriteModule } from '../../../shared/favorite/favorite.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StorageModule } from '../../../shared/media/storage/storage.module';

@NgModule({
  declarations: [
    ProductNewerComponent,
    ProductItemComponent
  ],
  exports: [
    ProductNewerComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FavoriteModule,
    LocalizeRouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    StorageModule,
    TranslateModule.forChild(),
  ]
})
export class ProductModule {
}
