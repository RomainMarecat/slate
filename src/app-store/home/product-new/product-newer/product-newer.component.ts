import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Favorite } from '../../../../shared/favorite/shared/favorite';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { UserService } from '../../../../shared/user/shared/user.service';
import { User } from '../../../../shared/user/shared/user';
import { Subscription } from 'rxjs';
import { ProductOption } from '../../../../shared/product/shared/product-option';

@Component({
  selector: 'app-product-newer',
  templateUrl: './product-newer.component.html',
  styleUrls: ['./product-newer.component.scss']
})
export class ProductNewerComponent implements OnInit {
  @Input() options: ProductOption = {
    authenticated: false,
    layout: 'card',
    product_new: {
      display_title: true,
      products: [],
      products_displayed: []
    },
    cart: null,
    user: null
  };
  userSubscription: Subscription;

  favoriteProducts: Map<string, Favorite> = new Map<string, Favorite>();

  @Output() productCount: EventEmitter<string> = new EventEmitter<string>();

  constructor(private favoriteService: FavoriteService,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    this.userSubscription = this.userService.getAuthState()
      .subscribe((user: User) => {
        if (user) {
          this.options.user = user;
          this.setFavorite(this.userService.getUser());
        }
      });
  }

  setFavorite(user: User) {
    this.favoriteService.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: user.uid
      },
    ]);
    this.favoriteService.getFavorites()
      .subscribe((favorites) => {
        if (favorites.length > 0) {
          favorites.forEach(favorite => {
            this.favoriteProducts.set(favorite.product, favorite);
          });
        }
      });
  }


  onFavoriteAdded(favorite: Favorite) {
    this.favoriteProducts.set(favorite.product, favorite);
  }

  onFavoriteRemoved(favoriteProduct: Favorite) {
    this.favoriteProducts.delete(favoriteProduct.product);
  }

}
