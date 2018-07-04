import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {

  form: FormGroup = Login2Component.getForm();
  @ViewChild('inputEmail') inputEmail: ElementRef;

  static getForm(): FormGroup {
    return new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      'remember_me': new FormControl(false)
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
