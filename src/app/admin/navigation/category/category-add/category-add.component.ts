import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from './../../../../shared/alert/alert.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  form: FormGroup;
  category: Category;

  constructor(private categoryService: CategoryService, private alertService: AlertService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
      'description': new FormControl('', [
        Validators.required,
      ])
    });
  }

  saveCategory() {
    console.log(this.form);
    if (this.form.valid === true) {
      this.category = this.form.value;
      this.categoryService.createCategory(this.category);
      this.alertService.toast(`La catégorie est ajoutée ${this.category.name}`, 'info');
      this.reset();
    }
  }

  reset() {
    this.form.reset({
      name: '',
      description: ''
    });
    this.category = null;
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }
}
