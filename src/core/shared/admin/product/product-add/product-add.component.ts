import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../alert/alert.service';
import { Product } from '../../../product/product';
import { ProductService } from '../../shared/product/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;
  product: Product;
  editorConfig: any;

  constructor(private productService: ProductService,
    private alertService: AlertService) {}


  ngOnInit() {
    this.createForm();
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '5rem',
      'minHeight': '2rem',
      'placeholder': 'Enter text content',
      'translate': 'no',
      'toolbar': []
    };
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
      'description': new FormControl('', [
        Validators.required,
      ])
    });
  }

  saveProduct() {

  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  set description(description) {
    this.form.patchValue({ description: description });
  }
}
