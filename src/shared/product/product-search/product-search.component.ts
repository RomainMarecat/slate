import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { CarProduct } from '../car-product';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: [ './product-search.component.scss' ]
})
export class ProductSearchComponent implements OnInit {

  form: FormGroup;
  showSearch = false;
  products: CarProduct[];
  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'search': new FormControl('')
    });
  }

  onActiveSearch(activate: boolean) {
    this.showSearch = activate;
  }

  onSearch() {
    this.productService.filters$.next(null);
    if (this.form.valid) {
      this.productService.filters$.next([{
        operator: '==',
        value: this.form.controls.search.value.toLowerCase(),
        column: 'name'
      }]);
      this.productService.getProducts()
        .subscribe((products) => {
          this.products = products;
        });
    }
  }

}
