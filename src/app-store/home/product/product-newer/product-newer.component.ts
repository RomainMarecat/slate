import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../../shared/product/shared/product';
import { Favorite } from '../../../../shared/favorite/shared/favorite';

@Component({
  selector: 'app-product-newer',
  templateUrl: './product-newer.component.html',
  styleUrls: ['./product-newer.component.scss']
})
export class ProductNewerComponent implements OnInit {
  @Input() authenticated: boolean;

  @Input() options: {
    layout: string;
    products: Product[];
    display_products: Product[]
  } = {
    layout: 'card',
    products: [],
    display_products: []
  };

  favoriteProducts: Map<string, Favorite> = new Map<string, Favorite>();

  @Output() productCount: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onFavoriteAdded(favorite: Favorite) {
    this.favoriteProducts.set(favorite.product.key, favorite);
  }

  onFavoriteRemoved(favoriteProduct: Favorite) {
    this.favoriteProducts.delete(favoriteProduct.product.key);
  }

}
