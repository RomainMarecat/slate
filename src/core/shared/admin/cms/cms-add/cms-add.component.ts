import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CmsService } from './../../shared/cms/cms.service';
import { Cms } from './../../shared/cms/cms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../alert/alert.service';

@Component({
  selector: 'app-cms-add',
  templateUrl: './cms-add.component.html',
  styleUrls: ['./cms-add.component.scss']
})
export class CmsAddComponent implements OnInit {
  form: FormGroup;
  cms: Cms;

  constructor(private cmsService: CmsService, private alertService: AlertService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
      'site_name': new FormControl('', [
        Validators.required,
      ])
    });
  }

  saveCms() {
    console.log(this.form);
    if (this.form.valid === true) {
      this.cms = this.form.value;
      this.cmsService.createCms(this.cms);
      this.alertService.toast(`Le cms est ajoutée ${this.cms.name}`, 'info');
      this.reset();
    }
  }

  reset() {
    this.form.reset({
      name: '',
      site_name: ''
    });
    this.cms = null;
  }

  get name() {
    return this.form.get('name');
  }

  get site_name() {
    return this.form.get('site_name');
  }

}
