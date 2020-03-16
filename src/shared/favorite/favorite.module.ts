import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite/favorite.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { LoaderModule } from '../loader/loader.module';
import { NgPipesModule } from 'ngx-pipes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { PopupModule } from '../popup/popup.module';
import { RouterModule } from '@angular/router';
import { StorageModule } from '../media/storage/storage.module';
import { SharedProductModule } from '../product/shared-product.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    LoaderModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    NgPipesModule,
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    PopupModule,
    RouterModule,
    StorageModule,
    TranslateModule.forChild(),
    SharedProductModule
  ],
  declarations: [
    FavoriteComponent,
    FavoriteListComponent,
    FavoriteItemComponent
  ]
})
export class FavoriteModule {
}
