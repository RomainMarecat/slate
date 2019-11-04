import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../shared/product/shared/product';
import { HockeyProduct } from '../../../shared/product/shared/hockey-product';
import { UserService } from '../../../shared/user/shared/user.service';
import { ScoreService } from '../../../shared/score/score.service';
import { Score } from '../../../shared/score/score';
import { AlertService } from '../../../shared/popup/alert.service';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {

  @Input() product: HockeyProduct;
  @Output() updateScore: EventEmitter<HockeyProduct> = new EventEmitter<HockeyProduct>();

  constructor(private userService: UserService, private scoreService: ScoreService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  /**
   * Add +1 or -1 on current score
   * Test if User is authenticated, is Authorized (First time score this item)
   * If test is true, update HockeyProduct
   * @todo Update plus or minus string by new alogrithm
   */
  score(product: HockeyProduct, score: string) {
    this.userService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.scoreService.filterByProduct(product.key);
        this.scoreService.filterByUser(this.userService.getUser().uid);
        this.scoreService.isAuthorized().subscribe((authorized) => {
          if (authorized) {
            this.updateProductScore(product, score);
          } else {
            this.alertService.toast('Vous avez déjà voté', {panelClass: 'error'});
          }
        }, (err) => {
          this.alertService.toast('Nous ne sommes pas en mesure de savoir si vous avez voté, veuillez recommencer.', {panelClass: 'error'});
        });
      } else {
        this.alertService.toast('Il faut se connecter pour pouvoir voter', {panelClass: 'error'});
      }
    }, (err) => {
      this.alertService.toast('Vous n\'avons pas retrouvé votre utilisateur', {panelClass: 'error'});
    });
  }

  /**
   * Create new score in the collection with user id
   * Update the Product
   */
  updateProductScore(product: HockeyProduct, score: string) {
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
    this.scoreService.createScore(newScore);
    this.updateScore.emit(product);
  }
}
