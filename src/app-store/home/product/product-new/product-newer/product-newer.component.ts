import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../../../../../shared/favorite/shared/favorite';
import { FavoriteService } from '../../../../../shared/favorite/shared/favorite.service';
import { UserService } from '../../../../../shared/user/shared/user.service';
import { User } from '../../../../../shared/user/shared/user';
import { ProductOption } from '../../../../../shared/product/shared/product-option';

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
