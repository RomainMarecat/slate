import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../shared/product';
import { UserService } from '../../user/shared/user.service';
import { ScoreService } from '../../score/score.service';
import { AlertService } from '../../popup/alert.service';
import { Cart, CartItem } from '../../cart/shared/cart';
import { CartService } from '../../cart/shared/cart.service';
import { Filter } from '../../facet/filter/shared/filter';
import { Router } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { LocalizeRouterService } from 'localize-router';
import { take, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {

  isLoading: boolean;

  @ViewChild('inputQuantity') inputQuantity: ElementRef<HTMLInputElement>;

  @Input() isProductSellable: boolean;

  @Input() isProductScorable: boolean;

  /**
   * Product $product input
   */
  @Input() product: Product;

  /**
   * When product score is updated
   */
  @Output() updateScore: EventEmitter<Product> = new EventEmitter<Product>();

  /**
   * When product is added to cart with positive or negative product
   */
  @Output() addedCart: EventEmitter<Product> = new EventEmitter<Product>();

  cart: Cart;

  constructor(private userService: UserService,
              private scoreService: ScoreService,
              private alertService: AlertService,
              private router: Router,
              private loaderService: LoaderService,
              private cartService: CartService,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
  }

  /**
   * Add +1 or -1 on current score
   * Test if User is authenticated, is Authorized (First time score this item)
   * If test is true, update Product
   * @todo Update plus or minus string by new alogrithm
   */
  score(product: Product, score: string) {
    this.userService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.scoreService.filterByProduct(product.key);
        this.scoreService.filterByUser(this.userService.getUser().uid);
        this.scoreService.isAuthorized().subscribe((authorized) => {
          if (authorized) {
            this.updateProductScore(product, score);
          } else {
            this.alertService.show('Vous avez déjà voté', 'error');
          }
        }, () => {
          this.alertService.show('Nous ne sommes pas en mesure de savoir si vous avez voté, veuillez recommencer.', 'error');
        });
      } else {
        this.alertService.show('Il faut se connecter pour pouvoir voter', 'error');
      }
    }, () => {
      this.alertService.show('Vous n\'avons pas retrouvé votre utilisateur', 'error');
    });
  }

  /**
   * Create new score in the collection with user id
   * Update the Product
   */
  updateProductScore(product: Product, score: string) {
    if (!product.score) {
      product.score = 0;
    }
    if (score === 'plus') {
      product.score++;
    } else {
      product.score--;
    }
    const newScore = {
      created_at: new Date(),
      user: this.userService.getUser().uid,
      product: product.key
    };
    this.scoreService.createScore(newScore).then();
    this.updateScore.emit(product);
  }

  /**
   * Update quantity number in input value
   */
  updateQuantity(quantity: number) {
    this.inputQuantity.nativeElement.value = (parseInt(this.inputQuantity.nativeElement.value, 10) + quantity)
      .toString();
  }

  getCart() {
    const filters: Filter[] = [{
      column: 'user',
      operator: '==',
      value: this.userService.getUser().uid
    }];

    this.cartService.filters$.next(filters);
    this.cartService.getCarts()
      .subscribe((carts: Cart[]) => {
        if (carts && carts.length > 0 && carts[0]) {
          this.cart = carts[0];
        }
      });
  }

  /**
   * Add to cart a product
   */
  addToCart(product: Product, quantity: string) {
    this.isLoading = true;
    this.loaderService.show();
    this.userService.isAuthenticated()
      .subscribe((authenticated) => {
        if (authenticated) {
          const cartItem: CartItem = {
            name: product.name,
            code: product.key,
            quantity: parseInt(quantity, 10),
            price: product.price,
            created_at: new Date(),
            updated_at: new Date(),
          };
          const filters: Filter[] = [{
            column: 'user',
            operator: '==',
            value: this.userService.getUser().uid
          }, {
            column: 'status',
            operator: '==',
            value: 'current'
          }];

          this.cartService.filters$.next(filters);
          this.cartService.getCarts()
            .pipe(take(1))
            .subscribe((carts: Cart[]) => {
              this.loaderService.hide();
              this.isLoading = false;
              if (carts && carts.length > 0 && carts[0]) {
                const cart: Cart = carts[0];

                const filtered = cart.items.filter((item) => item.code === cartItem.code);
                if (filtered.length === 0) {
                  cart.items.push(cartItem);
                  cart.total += cartItem.quantity * cartItem.price;
                } else {
                  cart.items = cart.items.map((item: CartItem) => {
                    if (item.code === product.key) {
                      item = cartItem;
                      item.quantity = item.quantity + cartItem.quantity;
                      cart.total += cartItem.quantity * cartItem.price;
                    }
                    return item;
                  });
                }

                // Always reset cart to state "cart" when we add product to cart
                cart.state = 'cart';

                this.cartService.updateCart(cart)
                  .subscribe(() => {
                    this.isLoading = false;
                    this.loaderService.hide();
                    this.router.navigate([this.localizeRouterService.translateRoute('/cart')]);
                    this.alertService.show('product-detail.cart.added');
                  }, () => {
                    this.loaderService.hide();
                    this.isLoading = false;
                    this.alertService.show('product-detail.error.cart-add');
                  });
              }
            }, (err) => {
              this.isLoading = false;
              this.loaderService.hide();
              this.alertService.show(err);
            });
          return;
        }
        this.isLoading = false;
        this.loaderService.hide();

        this.alertService.show('product-detail.cart.error.user', 'error');
      }, () => {
        this.isLoading = false;
        this.loaderService.hide();
      });
  }
}
