import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from './../../shared/product/product';
import { IProduct } from './../../shared/product/i-product';
import { UserService } from './../../shared/user/user.service';
import { ScoreService } from './../../shared/score/score.service';
import { Score } from './../../shared/score/score';
import { AlertService } from './../../shared/alert/alert.service';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {

  @Input() product: IProduct;
  @Output() updateScore: EventEmitter < IProduct > = new EventEmitter < IProduct > ();

  constructor(private userService: UserService, private scoreService: ScoreService,
    private alertService: AlertService) {}

  ngOnInit() {}

  /**
   * Add +1 or -1 on current score
   * Test if User is authenticated, is Authorized (First time score this item)
   * If test is true, update IProduct
   * @param {IProduct} product
   * @param {string}    score    string plus or minus
   * @todo Update plus or minus string by new alogrithm
   */
  score(product: IProduct, score: string) {
    this.userService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.scoreService.filterByProduct(product.key);
        this.scoreService.filterByUser(this.userService.getUser().uid);
        this.scoreService.isAuthorized().subscribe((authorized) => {
          if (authorized) {
            this.updateProductScore(product,	 score);
          } else {
            this.alertService.toast('Vous avez déjà voté', 'error');
          }
        }, (err) => {
          this.alertService.toast('Nous ne sommes pas en mesure de savoir si vous avez voté, veuillez recommencer.', 'error');
        });
      } else {
        this.alertService.toast('Il faut se connecter pour pouvoir voter', 'error');
      }
    }, (err) => {
      this.alertService.toast('Vous n\'avons pas retrouvé votre utilisateur', 'error');
    });
  }

  /**
   * Create new score in the collection with user id
   * Update the Product
   * @param {IProduct} product
   * @param {string}    score
   */
  updateProductScore(product: IProduct, score: string) {
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
      product:	 product.key
    };
    this.scoreService.createScore(newScore);
    this.updateScore.emit(product);
  }
}
