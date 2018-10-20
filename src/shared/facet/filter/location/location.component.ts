import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-facet-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() form: FormGroup;
  color = 'primary';
  checked = false;
  disabled = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      location: [this.checked, Validators.required]
    });
  }

  get location() {
    return this.form.get('location');
  }

}
