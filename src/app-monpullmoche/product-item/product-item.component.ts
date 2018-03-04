import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/product/product';
import { ClothingProduct } from '../../shared/product/clothing-product';
import { DateService } from '../../shared/util/date.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  _product: ClothingProduct;
  @Output() updatedProduct: EventEmitter < ClothingProduct > = new EventEmitter < ClothingProduct > ();
  cols: number;
  resizedImage: any;
  humanPublishedAt: string;

  constructor(private router: Router, public dateService: DateService) {
    // Add columns number for each images max < 4
    this.cols = 0;
    // Display fixed images for item view
    this.resizedImage = { height: '240', width: '240' };
  }

  ngOnInit() {}

  /**
   * Getter for product
   */
  get product() {
    return this._product;
  }

  /**
   * Product binding and auto resize columns
   * @param ClothingProduct Product
   */
  @Input() set product(product: ClothingProduct) {
    this.humanPublishedAt = this.dateService.compareDatetoHumanReadableString(product.published_at);
    this._product = product;
    this.countCols();
  }

  /**
   * Update a new score from a new score event
   * @param {ClothingProduct} product
   */
  updateScoreProduct(product: ClothingProduct) {
    this.updatedProduct.emit(product);
  }

  /**
   * Go to product page detail
   */
  productDetail() {
    this.router.navigate(['/product', this.product.key + '-' + this.product.name]);
  }

  /**
   * Count columns for each image in ClothingProduct type
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
