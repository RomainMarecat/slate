import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from './shared/favorite.service';
import { ProductService } from '../product/shared/product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FavoriteService,
    ProductService
  ]
})
export class FavoriteModule {
}
