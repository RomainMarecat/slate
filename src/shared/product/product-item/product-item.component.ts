import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Favorite } from '../../favorite/shared/favorite';
import { Product } from '../shared/product';
import { FavoriteService } from '../../favorite/shared/favorite.service';
import { AlertService } from '../../popup/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../shared/product.service';
import { UserService } from '../../user/shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../cart/shared/cart.service';
import { Cart } from '../../cart/shared/cart';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { CommentDialogComponent } from '../../comment/comment-dialog/comment-dialog.component';
import { ProductOption, SpecificProductOption } from '../shared/product-option';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  /**
   * All specific options
   */
  @Input() options: ProductOption;

  /**
   * All options to display product
   */
  @Input() specificOptions: SpecificProductOption;

  /**
   * When product was added in cart
   */
  @Input() inCart: boolean;

  /**
   * If product was added to favorite
   */
  @Input() favoriteProduct: Favorite;
  /**
   * the product we need to show
   */
  @Input() product: Product;

  /**
   * est-on dans une modale ? (suggestions) ou non
   */
  @Input() inModal: boolean;

  /**
   * Authentication de l'utilisateur si oui ou non
   */
  @Input() authenticated: boolean;

  /**
   * label added on click to cta add to cart
   */
  matTooltipCart = '';

  /**
   * label added on favorite
   */
  matTooltipFavorite = '';

  @Output() favoriteAdded: EventEmitter<Favorite> = new EventEmitter<Favorite>();

  @Output() favoriteRemoved: EventEmitter<Favorite> = new EventEmitter<Favorite>();

  getDiscountRate = ProductService.getDiscountRate;

  isLoadingCartAdd: boolean;

  @Output() cartUpdated: EventEmitter<Cart> = new EventEmitter<Cart>();

  constructor(private router: Router,
              private localizeRouterService: LocalizeRouterService,
              private favoriteService: FavoriteService,
              private alertService: AlertService,
              private translateService: TranslateService,
              private userService: UserService,
              private cartService: CartService,
              private productService: ProductService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  getOrderedNumber(): string {
    const month: string = moment().format('YYYY-MM');
    if (this.product && this.product.ordered_by_month && this.product.ordered_by_month[month]) {
      return this.product.ordered_by_month[month].toString(10);
    }
    return '0';
  }

  toggleComment(product: Product) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: {
        comment: {
          entity_type: 'product',
          entity_key: product.key,
          commentTime: new Date(),
          order: 1
        }
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.product.commented++;
        this.productService.updateProduct(this.product)
          .subscribe(() => {
          });
      }
    });
  }

  /**
   * Add product to favorite for current user
   */
  toggleFavorite(product: Product, favProduct: Favorite) {
    if (this.authenticated) {
      if (favProduct) {
        this.deleteFavorite(favProduct);
        return;
      }
      const favoriteProduct: Favorite = {key: null, product: product.key, user: this.userService.getUser().uid};
      this.createFavorite(favoriteProduct);
      return;
    }
    this.alertService.show('favorite.user.unauthenticated');
  }

  createFavorite(favoriteProduct: Favorite) {
    this.favoriteService.createFavorite(favoriteProduct)
      .subscribe((doc) => {
        favoriteProduct.key = doc.id;
        this.favoriteService.updateFavorite(favoriteProduct)
          .subscribe(() => {
            this.favoriteAdded.emit(favoriteProduct);
            this.translateService.get('label.product_added_to_favorite')
              .subscribe((label) => this.matTooltipFavorite = label);
          }, (err: HttpErrorResponse) => {
            this.alertService.show(err.error);
          });
      }, (err: HttpErrorResponse) => {
        this.alertService.show(err.error);
      });
  }

  deleteFavorite(favoriteProduct: Favorite) {
    this.favoriteService.deleteFavorite(favoriteProduct)
      .then(() => {
        this.favoriteRemoved.emit(favoriteProduct);
        this.matTooltipFavorite = '';
      }, (err: HttpErrorResponse) => {
        this.alertService.show(err.error);
      });
  }

  /**
   * Add a product to cart
   */
  addToCart(product: Product) {
    if (this.options.user) {
      this.isLoadingCartAdd = true;
      this.cartService.addToCart(product, this.options.user)
        .subscribe((cart: Cart) => {
          this.isLoadingCartAdd = false;
          this.cartUpdated.emit(cart);
          this.router.navigate([this.localizeRouterService.translateRoute('/cart')]);
        }, () => {
          this.isLoadingCartAdd = false;
          this.alertService.show('cart-add.error.save-new-product');
        });
    }
  }
}
