import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { LoaderService } from '../../loader/loader.service';
import { DateService } from '../../util/date.service';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrls: ['./product-item-card.component.scss']
})
export class ProductItemCardComponent implements OnInit {

  private _product: Product;
  @Output() updatedProduct: EventEmitter<Product> = new EventEmitter<Product>();
  cols: number;
  resizedImage: any;
  humanPublishedAt: string;
  @Input() showScore: boolean;
  @Input() showAdd: boolean;
  loading: boolean;

  constructor(private router: Router,
              public dateService: DateService,
              private localizeRouterService: LocalizeRouterService,
              private loaderService: LoaderService) {
    // Add columns number for each images max < 4
    this.cols = 0;
    // Display fixed images for item view
    this.resizedImage = {height: '240'};
    this.loading = true;
    this.loaderService.show();
  }

  ngOnInit() {
  }

  /**
   * Getter for product
   */
  get product() {
    return this._product;
  }

  /**
   * Product binding and auto resize columns
   */
  @Input() set product(product: Product) {
    if (product.published_at && product.published_at.seconds && product.published_at.nanoseconds) {
      this.humanPublishedAt = this.dateService
        .compareDatetoHumanReadableString(product.published_at.toDate());
    }
    this._product = product;
    this.countCols();
  }

  /**
   * Update a new score from a new score event
   */
  updateScoreProduct(product: Product) {
    this.updatedProduct.emit(product);
  }

  onMediaLoaded(loaded: boolean) {
    this.loading = !loaded;
    if (loaded) {
      this.loaderService.hide();
    }
  }

  /**
   * Go to product page detail
   */
  productDetail() {
    this.router.navigate(['/products']).then(() => {
      this.router.navigate(
        [
          this.localizeRouterService.translateRoute('/products'),
          this.localizeRouterService.translateRoute('detail'),
          `${this.product.key}-${this.product.name}`
        ]
      );
    });
  }

  /**
   * Count columns for each image in Product type
   */
  countCols() {
    if (this._product.image1) {
      this.cols++;
    }
    if (this._product.image2) {
      this.cols++;
    }
    if (this._product.image3) {
      this.cols++;
    }
  }
}
