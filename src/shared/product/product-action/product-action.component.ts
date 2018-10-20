import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../shared/product';
import { UserService } from '../../user/shared/user.service';
import { ScoreService } from '../../score/score.service';
import { AlertService } from '../../popup/alert.service';
import { Cart, CartItem } from '../../cart/shared/cart';
import { CartService } from '../../cart/shared/cart.service';
import { Filter } from '../../facet/filter/shared/filter';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {

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
              private cartService: CartService) {
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
        }, (err) => {
          this.alertService.show('Nous ne sommes pas en mesure de savoir si vous avez voté, veuillez recommencer.', 'error');
        });
      } else {
        this.alertService.show('Il faut se connecter pour pouvoir voter', 'error');
      }
    }, (err) => {
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
      operator: '=',
      value: this.userService.getUser().uid
    }];

    this.cartService.filters$.next(filters);
    this.cartService.getCarts()
      .subscribe((carts: Cart[]) => {
        console.log(carts);
        if (carts && carts.length > 0 && carts[0]) {
          this.cart = carts[0];
        }
      });
  }

  /**
   * Add to cart a product
   */
  addToCart(product: Product, quantity: number) {
    const cartItem: CartItem = {
      name: product.name,
      code: product.key,
      quantity: quantity,
      price: product.price,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const filters: Filter[] = [{
      column: 'user',
      operator: '=',
      value: this.userService.getUser().uid
    }];

    this.cartService.filters$.next(filters);
    this.cartService.getCarts()
      .subscribe((carts: Cart[]) => {
        console.log(carts);
        if (carts && carts.length > 0 && carts[0]) {
          const cart: Cart = carts[0];
          cart.items = cart.items.map((item) => {
            if (item.code === product.key) {
              item = {
                ...cartItem,
                ...{
                  quantity: item.quantity + cartItem.quantity
                }
              };
            }
            return item;
          });
          this.cartService.updateCart(cart)
            .then(() => {
            }, (err) => {
              this.alertService.show(err);
            });
        }
      }, (err) => {
        this.alertService.show(err);
      });
  }
}
