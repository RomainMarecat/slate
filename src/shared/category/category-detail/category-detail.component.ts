import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { Product } from '../../product/shared/product';
import { ProductService } from '../../product/shared/product.service';
import { Cart } from '../../cart/shared/cart';
import { User } from '../../user/shared/user';
import { CartService } from '../../cart/shared/cart.service';
import { UserService } from '../../user/shared/user.service';
import { Favorite } from '../../favorite/shared/favorite';
import { FavoriteService } from '../../favorite/shared/favorite.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ProductOption, SpecificProductOption } from '../../product/shared/product-option';

export interface CategoryOption {
  display_title: boolean;
  display_image: boolean;
  display_products: boolean;
}

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  @Input() option: CategoryOption = {
    display_title: true,
    display_image: true,
    display_products: true,
  };

  category: Category;

  @Input() options: ProductOption = {
    authenticated: false,
    cart: null,
    user: null
  };

  @Input() specificOptions: SpecificProductOption = {
    layout: 'card',
    display_title: false,
    products: [],
    favorite: {
      display_icon: true
    },
    title: ''
  };

  favoriteProducts: Map<string, Favorite> = new Map<string, Favorite>();
  favoriteCategories: Map<string, Favorite> = new Map<string, Favorite>();

  authenticated: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService,
              private cartService: CartService,
              private userService: UserService,
              private favoriteService: FavoriteService) {
  }

  ngOnInit() {
    this.getCategory();
    this.getCart();
  }

  setFavorite(category: string, user: User) {
    this.favoriteService.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: user.uid
      },
    ]);
    this.favoriteService.getFavorites()
      .pipe(
        take(1)
      )
      .subscribe((favorites) => {
        if (favorites.length > 0) {
          let found = null;
          favorites.forEach(favorite => {
            if (favorite.product) {
              this.favoriteProducts.set(favorite.product, favorite);
            }

            if (favorite.category) {
              if (favorite.category === category) {
                found = favorite;
              }
              this.favoriteCategories.set(favorite.category, favorite);
            }
          });
          if (found) {
            found.nb_view++;
            this.favoriteService.updateFavorite(found)
              .subscribe(() => {
              });
            return;
          }
        }
        this.createFavorite(category, user);
      });
  }

  createFavorite(category: string, user: User) {
    this.favoriteService.createFavorite({
      key: null,
      category: category,
      user: user.uid,
      nb_view: 1
    }).subscribe(() => {
    });
  }

  onFavoriteAdded(favorite: Favorite) {
    this.favoriteProducts.set(favorite.product, favorite);
  }

  onFavoriteRemoved(favoriteProduct: Favorite) {
    this.favoriteProducts.delete(favoriteProduct.product);
  }

  getUser(category: string) {
    const subscription: Subscription = this.userService.getCurrentUser()
      .pipe(
        take(1)
      )
      .subscribe((user) => {
        if (subscription) {
          subscription.unsubscribe();
        }

        if (user) {
          this.authenticated = true;
          this.options.user = user;
          this.setFavorite(category, user);
          return;
        }
        this.authenticated = false;
      });
  }

  getCart() {
    this.cartService.cart$.subscribe((cart) => this.options.cart = cart);
  }

  getCategory() {
    this.activatedRoute.params.subscribe((param) => {
      if (param.slug) {
        this.categoryService.getCategory(param.slug)
          .subscribe((category: Category) => {
            this.category = category;
          });
        this.getUser(param.slug);
        this.getProducts(param.slug);
      }
    });
  }

  getProducts(category: string) {
    this.productService.filters$.next([
      {
        column: 'category',
        operator: '==',
        value: category
      }
    ]);

    this.productService.getProducts()
      .subscribe((products) => {
        this.specificOptions.products = products;
      }, () => {
        this.specificOptions.products = [];
      });
  }
}
