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

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  category: Category;

  products: Product[] = [];

  @Input() options: {
    layout: string;
    cart: Cart,
    user: User
  } = {
    layout: 'card',
    cart: null,
    user: null
  };

  favoriteProducts: Map<string, Favorite> = new Map<string, Favorite>();

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
    this.getUser();
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

  getUser() {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.authenticated = true;
        this.options.user = user;
        this.setFavorite(user);
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
      if (param.key) {
        this.categoryService.getCategory(param.key)
          .subscribe((category: Category) => {
            this.category = category;
          });
        this.getProducts(param.key);
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
        this.products = products;
      }, () => {
        this.products = [];
      });
  }
}
