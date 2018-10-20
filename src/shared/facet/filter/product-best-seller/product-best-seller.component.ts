import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-facet-product-best-seller',
  templateUrl: './product-best-seller.component.html',
  styleUrls: ['./product-best-seller.component.scss']
})
export class ProductBestSellerComponent implements OnInit {
  @Input() form: FormGroup;
  color = 'primary';
  checked = false;
  disabled = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      seller: [this.checked, Validators.required]
    });
  }

  get seller() {
    return this.form.get('seller');
  }

}
