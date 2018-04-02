import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/category/category.service';
import { Category } from '../../../shared/category/category';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-menincar-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: [ './product-edit.component.scss' ]
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;

  brands: Category[];

  static getForm(): FormGroup {
    return new FormGroup({
      'brand': new FormControl('', [ Validators.required ]),
      'model': new FormControl('', Validators.required),
      'reseller_type': new FormControl(''),
      // 'offer_type': new FormControl(''),
      'name': new FormControl('', [ Validators.required ]),
      'description': new FormControl('', [ Validators.required ]),
      'price': new FormControl('', [ Validators.required ]),
      'images': new FormArray([
        new FormControl('')
      ]),
      'location': new FormControl('', [ Validators.required ]),
      'user': new FormGroup({
        'username': new FormControl(''),
        'email': new FormControl(''),
        'phone': new FormControl('')
      })
    });
  }

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.form = ProductEditComponent.getForm();
    this.getBrands();
  }

  getCategories(): Observable<Category[]> {
    return this.categoryService.getCategories();
  }

  getBrands() {
    this.categoryService.filters$.next([ {
      column: 'level',
      value: 1,
      operator: '=='
    } ]);
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.getCategories()
      .take(1)
      .subscribe((brands) => {
        this.brands = brands;
      });
  }

  getModels(brand: Category) {
    this.categoryService.filters$.next([
      {
        column: 'level',
        value: brand.level + 1,
        operator: '=='
      },
      {
        column: 'parent',
        value: brand.key,
        operator: '=='
      } ]);
  }
}
