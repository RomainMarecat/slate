import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadioButtonComponent implements OnInit {

  form: FormGroup = new FormGroup({
    season: new FormControl('', [
      Validators.required,
    ]),
  });
  favoriteSeason: string;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];
  constructor() { }

  ngOnInit() {
  }

  get season() {
    return this.form.get('season');
  }

  set season(season) {
    this.form.patchValue({season});
  }
}
