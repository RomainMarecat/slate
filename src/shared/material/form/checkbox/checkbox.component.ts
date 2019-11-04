import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [ './checkbox.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  colors: string[] = [
    'Red',
    'Blue',
    'White',
    'Black',
    'Yellow',
    'Green'
  ];
  form: FormGroup = new FormGroup({
    Red: new FormControl(false, [
      Validators.required,
    ]),
    Blue: new FormControl(false, [
      Validators.required,
    ]),
    White: new FormControl(false, [
      Validators.required,
    ]),
    Black: new FormControl(false, [
      Validators.required,
    ]),
    Yellow: new FormControl(false, [
      Validators.required,
    ]),
    Green: new FormControl(false, [
      Validators.required,
    ]),
  });

  constructor() {
  }

  ngOnInit() {
  }

}
