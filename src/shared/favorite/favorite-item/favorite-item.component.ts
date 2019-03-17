import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../shared/favorite.service';
import { ProductService } from '../../product/shared/product.service';
import { Product } from '../../product/shared/product';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent implements OnInit {

  _favorite: Favorite;

  product: Product;

  getDiscountRate = ProductService.getDiscountRate;

  constructor(private favoriteService: FavoriteService,
              private productService: ProductService) {
  }

  ngOnInit() {
  }

  @Input() set favorite(favorite: Favorite) {
    this._favorite = favorite;
    if (favorite && favorite.product) {
      this.productService.getProduct(favorite.product)
        .subscribe((product: Product) => {
          this.product = product;
        }, () => {
          this.product = null;
        });
    }
  }

  get favorite(): Favorite {
    return this._favorite;
  }
}
