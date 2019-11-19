import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../../../src/shared/product/shared/product';
import { ProductService } from '../../../../../src/shared/product/shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  products: Product[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService) {
    this.getForm();
  }

  ngOnInit() {
  }

  search() {
    if (this.form.valid && this.form.value.keywords.length > 0) {
      this.router.navigate(['search']);
    }
  }

  getForm() {
    this.form = this.formBuilder.group({
      keywords: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]]
    });
  }

  getProducts() {
    this.productService.query$.next([{
      limit: 20
    }]);
    this.productService.getProducts()
      .subscribe((products) => {
        this.products = products;
      }, () => {
        this.products = [];
      });
  }
}
