import { Component, OnInit, ElementRef } from '@angular/core';
import { IClothing } from './../../../shared/clothing/i-clothing';
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
  clothes$: Observable < IClothing[] > ;
  isLoading = false;
  selected: IClothing[];

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
      prop: 'description',
      name: 'description',
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
  publishClothing() {
    this.selected.forEach((clothing: IClothing) => {
      clothing.published = true;
      clothing.published_at = new Date();
      this.productService.updateClothing(clothing);
    });
  }

  /**
   * Init list of product
   */
  ngOnInit() {
    this.clothes$ = this.productService.getClothes();
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
}
