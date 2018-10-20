import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/product';
import { DateService } from '../../util/date.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { LoaderService } from '../../loader/loader.service';
import { firestore, Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  _product: Product;
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
    this.router.navigate(
      [
        this.localizeRouterService.translateRoute('/products'),
        this.localizeRouterService.translateRoute('detail'),
        `${this.product.key}-${this.product.name}`
      ]
    );
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
