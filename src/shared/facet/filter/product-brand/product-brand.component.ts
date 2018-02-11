import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-facet-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss']
})
export class ProductBrandComponent implements OnInit {
  @Input('form') form: FormGroup;

  options: Array < string > ;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.options = [
      'Bauer',
      'CCM',
      'Easton',
      'Graf',
      'Mission',
      'Reebok',
      'Sherwood',
      'Vaughn',
      'Wilson',
    ];
    this.form = this.formBuilder.group({
      brand: ['', Validators.required]
    });
  }

  get brand() {
    return this.form.get('brand');
  }

}
