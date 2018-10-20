import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-facet-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  @Input() form: FormGroup;

  options: Array < string > ;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.options = [
      'Achat en ligne',
      'En magasin',
      'Livraison express',
      'Remise en main propre',
    ];
    this.form = this.formBuilder.group({
      delivery: ['', Validators.required]
    });
  }

  get delivery() {
    return this.form.get('delivery');
  }

}
