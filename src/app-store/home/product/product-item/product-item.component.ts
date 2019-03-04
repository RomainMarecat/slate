import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Favorite } from '../../../../shared/favorite/shared/favorite';
import { Product } from '../../../../shared/product/shared/product';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { AlertService } from '../../../../shared/popup/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../../../shared/product/shared/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() options;

  @Input() inCart: boolean;

  /**
   * Si le produit est ajouté en favoris
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
   * Le label ajouté lors d'un ajout panier
   */
  matTooltipCart = '';

  /**
   * Le label ajouté lors d'un ajout au favoris
   */
  matTooltipFavorite = '';

  @Output() favoriteAdded: EventEmitter<Favorite> = new EventEmitter<Favorite>();

  @Output() favoriteRemoved: EventEmitter<Favorite> = new EventEmitter<Favorite>();

  getDiscountRate = ProductService.getDiscountRate;

  constructor(private favoriteService: FavoriteService,
              private alertService: AlertService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
  }

  /**
   * Ajout du produit au favoris de l'utilisateur
   */
  toggleFavorite(product: Product, favProduct: Favorite) {
    if (this.authenticated) {
      if (favProduct) {
        this.favoriteService.deleteFavorite(favProduct)
          .then(() => {
            this.favoriteRemoved.emit(favProduct);
            this.matTooltipFavorite = '';
          }, (err) => {
            this.alertService.show(err);
          });
        return;
      }
      this.favoriteService.createFavorite({key: null, product: product, user: null})
        .then((favoriteProduct: Favorite) => {
          this.favoriteService.updateFavorite(favoriteProduct)
            .then(() => {
              this.favoriteAdded.emit(favoriteProduct);
              this.translateService.get('label.product_added_to_favorite')
                .subscribe((label) => this.matTooltipFavorite = label);
            });
        }, (err) => {
          this.alertService.show(err);
        });
    }
  }


  addToCart(product: Product) {

  }
}
