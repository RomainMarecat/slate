import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
selector: 'app-input',
templateUrl: './input.component.html',
styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'date': new FormControl('', [
      Validators.required,
    ]),
    'datetime-local': new FormControl('', [
      Validators.required,
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX),
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    'month': new FormControl('', [
      Validators.required,
    ]),
    'number': new FormControl(0, [
      Validators.required,
      Validators.minLength(1)
    ]),
    'price': new FormControl(0, [
      Validators.required,
      Validators.minLength(1)
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),
    'search': new FormControl('', [
      Validators.required
    ]),
    'tel': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(16)
    ]),
    'time': new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    'url': new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    'week': new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    'textarea': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1000)
    ]),
    'textarea-extension': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1000)
    ]),
  });

  constructor() { }

  ngOnInit() {
  }

  get date() {
    return this.form.get('date');
  }

  set date(date) {
    this.form.patchValue({date: date});
  }

  get datetimeLocal() {
    return this.form.get('datetime-local');
  }

  set datetimeLocal(datetimeLocal) {
    this.form.patchValue({'datetime-local': datetimeLocal});
  }

  get email() {
    return this.form.get('email');
  }

  set email(email) {
    this.form.patchValue({email: email});
  }

  get month() {
    return this.form.get('month');
  }

  set month(month) {
    this.form.patchValue({month: month});
  }

  get number() {
    return this.form.get('number');
  }

  set number(number) {
    this.form.patchValue({number: number});
  }

  get price() {
    return this.form.get('price');
  }

  set price(price) {
    this.form.patchValue({price: price});
  }

  get password() {
    return this.form.get('password');
  }

  set password(password) {
    this.form.patchValue({password: password});
  }

  get search() {
    return this.form.get('search');
  }

  set search(search) {
    this.form.patchValue({search: search});
  }

  get tel() {
    return this.form.get('tel');
  }

  set tel(tel) {
    this.form.patchValue({tel: tel});
  }

  get time() {
    return this.form.get('time');
  }

  set time(time) {
    this.form.patchValue({time: time});
  }

  get url() {
    return this.form.get('url');
  }

  set url(url) {
    this.form.patchValue({url: url});
  }

  get week() {
    return this.form.get('week');
  }

  set week(week) {
    this.form.patchValue({week: week});
  }

  get textarea() {
    return this.form.get('textarea');
  }

  set textarea(textarea) {
    this.form.patchValue({textarea: textarea});
  }

  get textareaExtension() {
    return this.form.get('textarea-extension');
  }

  set textareaExtension(textareaExtension) {
    this.form.patchValue({'textarea-extension': textareaExtension});
  }
}
