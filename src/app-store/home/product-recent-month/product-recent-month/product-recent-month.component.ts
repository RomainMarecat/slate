import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../shared/user/shared/user';
import { Subscription } from 'rxjs';
import { Favorite } from '../../../../shared/favorite/shared/favorite';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { UserService } from '../../../../shared/user/shared/user.service';
import { ProductOption } from '../../../../shared/product/shared/product-option';

@Component({
  selector: 'app-product-recent-month',
  templateUrl: './product-recent-month.component.html',
  styleUrls: ['./product-recent-month.component.scss']
})
export class ProductRecentMonthComponent implements OnInit {

  @Input() options: ProductOption = {
    authenticated: false,
    layout: 'card',
    product_recent_month: {
      display_title: true,
      products: []
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
