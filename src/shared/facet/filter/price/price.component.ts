import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-facet-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      price: this.formBuilder.group({
        min: [''],
        max: ['']
      })
    });
  }

  get min() {
    return this.form.get('price').get('min');
  }

  get max() {
    return this.form.get('price').get('max');
  }
}
