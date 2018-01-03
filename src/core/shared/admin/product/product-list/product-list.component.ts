import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Product } from '../../../product/product';
import { ProductService } from './../../shared/product/product.service';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  products: Product[];
  isLoading = false;
  selected: Product[];
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;
  @ViewChild('imageCell') imageCell: TemplateRef < any > ;

  /**
   *
   * @param ElementRef table
   * @param ProductService productService
   */
  constructor(private table: ElementRef,
    private productService: ProductService) {
    this.selected = [];
  }

  /**
   * set at published at now et activate published to true
   */
  publishProduct() {
    this.selected.forEach((product: Product) => {
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
    this.selected.forEach((product: Product) => {
      this.productService.deleteProduct(product);
    });
  }

  /**
   * Init list of product
   */
  ngOnInit() {
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
      headerTemplate: this.checkboxHeader,
    }, {
      prop: 'image1',
      name: 'image1',
      flexGrow: 1,
      cellTemplate: this.imageCell,
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, ];
    this.productService.getProducts()
      .take(1)
      .subscribe((products: Product[]) => {
        this.products = products;
      });
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
