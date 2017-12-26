import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsDetailService } from './../../shared/cms-detail/cms-detail.service';
import { CmsDetail } from './../../shared/cms-detail/cms-detail';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../alert/alert.service';

@Component({
  selector: 'app-cms-detail-add',
  templateUrl: './cms-detail-add.component.html',
  styleUrls: ['./cms-detail-add.component.scss']
})
export class CmsDetailAddComponent implements OnInit {
  form: FormGroup;
  cmsDetail: CmsDetail;
  cmsKey: string;
  editorConfig: any;
  content: string;

  constructor(private cmsDetailService: CmsDetailService,
    private alertService: AlertService,
    private activeRoute: ActivatedRoute) {
    this.cmsKey = null;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((value: { key: string }) => {
      this.cmsKey = value.key;
    });
    this.createForm();
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '5rem',
      'minHeight': '2rem',
      'placeholder': 'Enter text content',
      'translate': 'no',
      'toolbar': []
    };
  }

  createForm() {
    this.form = new FormGroup({
      'title': new FormControl('', [
        Validators.required,
      ]),
      'content': new FormControl('', [
        Validators.required,
      ])
    });
  }

  saveCmsDetail() {
    this.form.patchValue({ 'content': this.content });
    if (this.form.valid === true && this.cmsKey !== null) {
      this.cmsDetail = this.form.value;
      this.cmsDetail.cms = this.cmsKey;
      this.cmsDetailService.createCmsDetail(this.cmsDetail);
      this.alertService.toast(`Le contenu cms est ajoutée ${this.cmsDetail.title}`, 'info');
      this.reset();
    }
  }

  reset() {
    this.form.reset({
      title: '',
      content: ''
    });
    this.cmsDetail = null;
  }

  get title() {
    return this.form.get('title');
  }
}
