import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from '../shared/product';
import { UserService } from '../../user/shared/user.service';
import { ScoreService } from '../../score/score.service';
import { AlertService } from '../../popup/alert.service';
import { Cart } from '../../cart/shared/cart';
import { CartService } from '../../cart/shared/cart.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {

  isLoading: boolean;

  @ViewChild('inputQuantity', {static: false}) inputQuantity: ElementRef<HTMLInputElement>;

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

  /**
   * Add to cart a product
   */
  addToCart(product: Product, quantity: string) {
    this.isLoading = true;
    this.loaderService.show();
    this.userService.isAuthenticated()
      .subscribe((authenticated) => {
        if (authenticated) {
          this.cartService.addToCart(product, this.userService.getUser(), parseInt(quantity, 10))
            .subscribe(() => {
              this.isLoading = false;
              this.addedCart.emit(product);
              this.router.navigate([this.localizeRouterService.translateRoute('/cart')]);
            }, () => {
              this.isLoading = false;
              this.alertService.show('cart-add.error.save-new-product');
            });
        }
      }, () => {
        this.isLoading = false;
        this.loaderService.hide();
      });
  }
}
