import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from './header/header.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PopupModule } from '../../shared/popup/popup.module';
import { CategoryFavoriteModule } from './category-favorite/category-favorite.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CategoryModule,
    CategoryFavoriteModule,
    ProductModule,
    CommonModule,
    HeaderModule,
    HomeRoutingModule,
    PopupModule,
    TranslateModule.forChild()
  ],
})
export class HomeModule {
}
