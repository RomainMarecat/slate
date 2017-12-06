import { Component, OnInit, ElementRef } from '@angular/core';
import { IProduct } from '../../../../core/shared/product/i-product';
import { ProductService } from './../../shared/product/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  products$: Observable < IProduct[] > ;
  isLoading = false;
  selected: IProduct[];

  /**
   *
   * @param {ElementRef} table
   * @param {ProductService} productService
   */
  constructor(private table: ElementRef, private productService: ProductService) {
    this.columns = [{
      prop: 'image1',
      name: 'image1',
      flexGrow: 1
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, ];
    this.selected = [];
  }

  /**
   * set at published at now et activate published to true
   */
  publishProduct() {
    this.selected.forEach((product: IProduct) => {
      if (product.published === false) {
        product.published = true;
        if (!product.published_at) {
          product.published_at = new Date();
        }
      }

      this.productService.updateProduct(product);
    });
  }

  /**
   * Delete a product from list
   */
  deleteProduct() {
    this.selected.forEach((product: IProduct) => {
      this.productService.deleteProduct(product);
    });
  }

  /**
   * Init list of product
   */
  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}

  onScroll(event: any) {}

  onCheckboxChangeFn(event) {}
}
