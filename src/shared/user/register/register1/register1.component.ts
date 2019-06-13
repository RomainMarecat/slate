import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.scss']
})
export class Register1Component implements OnInit {

  form: FormGroup = Register1Component.getForm();
  @ViewChild('inputEmail', {static: false}) inputEmail: ElementRef;

  static getForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      email_confirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
    });
  }

  constructor() {
  }

  ngOnInit() {
    requestAnimationFrame(() => {
      this.inputEmail.nativeElement.focus();
    });
  }
}
