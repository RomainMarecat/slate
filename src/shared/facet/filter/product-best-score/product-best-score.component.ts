import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-facet-product-best-score',
  templateUrl: './product-best-score.component.html',
  styleUrls: ['./product-best-score.component.scss']
})
export class ProductBestScoreComponent implements OnInit {
  @Input('form') form: FormGroup;
  color = 'primary';
  checked = false;
  disabled = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      score: [this.checked, Validators.required]
    });
  }

  get score() {
    return this.form.get('score');
  }

}
