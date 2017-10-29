import { Component, OnInit, ElementRef } from '@angular/core';
import { IClothing } from './../../../shared/clothing/i-clothing';
import { ClothingService } from './../../../shared/clothing/clothing.service';
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
  pageLimit = 20;
  clothes$: Observable < IClothing[] > ;
  isLoading = false;
  selected: IClothing[];

  constructor(private table: ElementRef, private productService: ProductService) {
    this.columns = [{
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

  publishClothing() {
    this.selected.forEach((clothing: IClothing) => {
      clothing.published = true;
      clothing.published_at = new Date();
      this.productService.updateClothing(clothing);
    });
  }

  ngOnInit() {
    this.clothes$ = this.productService.getClothes();
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}
}
