import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../../../../../shared/favorite/shared/favorite';
import { FavoriteService } from '../../../../../shared/favorite/shared/favorite.service';
import { Product } from '../../../../../shared/product/shared/product';
import { SpecificProductOption } from '../../../../../shared/product/shared/product-option';
import { User } from '../../../../../shared/user/shared/user';
import { UserService } from '../../../../../shared/user/shared/user.service';

@Component({
  selector: 'app-home-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() options = {
    authenticated: false,
    cart: null,
    user: null
  };

  @Input() specificOptions: SpecificProductOption;

  @Input() products: Product[] = [];

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
