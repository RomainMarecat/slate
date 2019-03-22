import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../shared/user/shared/user';
import { Favorite } from '../../../../../shared/favorite/shared/favorite';
import { FavoriteService } from '../../../../../shared/favorite/shared/favorite.service';
import { UserService } from '../../../../../shared/user/shared/user.service';
import { ProductOption } from '../../../../../shared/product/shared/product-option';

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

  favoriteProducts: Map<string, Favorite> = new Map<string, Favorite>();

  constructor(private favoriteService: FavoriteService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAuthStateUser()
      .subscribe((user) => {
        if (user) {
          this.options.user = user;
          this.setFavorite(this.userService.getUser());
          this.trackFavorites();
        }
      });
  }

  trackFavorites() {
    this.favoriteService.favoriteUserProducts$
      .subscribe((favoriteUserProducts) => {
        this.favoriteProducts = favoriteUserProducts;
      }, () => {
        this.favoriteProducts.clear();
      });
  }

  setFavorite(user: User) {
    this.favoriteService.setFavorite(user);
  }

  onFavoriteAdded(favorite: Favorite) {
    this.favoriteService.onFavoriteUserProductAdded(favorite);
  }

  onFavoriteRemoved(favoriteProduct: Favorite) {
    this.favoriteService.onFavoriteUserProductRemoved(favoriteProduct);
  }
}
