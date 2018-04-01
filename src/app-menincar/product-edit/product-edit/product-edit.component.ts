import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../shared/category/category.service';
import { Category } from '../../../shared/category/category';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-menincar-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: [ './product-edit.component.scss' ]
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;

  brands: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.form = this.getForm();
    this.getCategories();
  }

  getForm(): FormGroup {
    return new FormGroup({
      'brand': new FormControl(''),
      'model': new FormControl(''),
      'reseller_type': new FormControl(''),
      'offer_type': new FormControl(''),
      'name': new FormControl(''),
      'description': new FormControl(''),
      'price': new FormControl(''),
      'images': new FormArray([
        new FormControl('')
      ]),
      'location': new FormControl(''),
      'user': new FormGroup({
        'username': new FormControl(''),
        'email': new FormControl(''),
        'phone': new FormControl('')
      })
    });
  }

  getCategories() {
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.categoryService.getCategories()
      .take(1)
      .subscribe(brands => {
        this.brands = brands;
      });
  }
}
