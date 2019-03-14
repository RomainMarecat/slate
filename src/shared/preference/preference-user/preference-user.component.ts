import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preference-user',
  templateUrl: './preference-user.component.html',
  styleUrls: ['./preference-user.component.scss']
})
export class PreferenceUserComponent implements OnInit {

  form: FormGroup = PreferenceUserComponent.getForm();

  static getForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(''),
    });
  }

  constructor() {
  }

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {

    }
  }

}
