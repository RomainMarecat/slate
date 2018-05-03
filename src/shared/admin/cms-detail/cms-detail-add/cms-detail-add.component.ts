import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { CmsDetail } from '../../../cms-detail/shared/cms-detail';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { Filter } from '../../../facet/filter/shared/filter';

@Component({
  selector: 'app-cms-detail-add',
  templateUrl: './cms-detail-add.component.html',
  styleUrls: [ './cms-detail-add.component.scss' ]
})
export class CmsDetailAddComponent implements OnInit {
  form: FormGroup = CmsDetailAddComponent.createForm();
  cmsDetails: CmsDetail[] = [];
  cmsDetail: CmsDetail;
  cmsKey: string;
  editorConfig: any;
  content: string;

  private static createForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      content: new FormControl('', [
        Validators.required,
      ]),
      parent: new FormControl(null)
    });
  }

  constructor(private cmsDetailService: CmsDetailService,
              private alertService: AlertService,
              private activeRoute: ActivatedRoute) {
    this.cmsKey = null;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((value: { key: string }) => {
      this.cmsKey = value.key;
      this.getCmsDetails(this.cmsKey);
    });

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

  getCmsDetails(cms: string) {
    this.cmsDetailService.filters$.next([
      {
        column: 'cms',
        operator: '==',
        value: cms
      }, {
        column: 'parent',
        operator: '==',
        value: null
      } ] as Filter[]);
    this.cmsDetailService.getCmsDetails()
      .subscribe((cmsDetails: CmsDetail[]) => {
        this.cmsDetails = cmsDetails;
      });
  }

  saveCmsDetail() {
    this.form.patchValue({'content': this.content});
    if (this.form.valid === true && this.cmsKey !== null) {
      this.cmsDetail = this.form.value;
      this.cmsDetail.cms = this.cmsKey;
      this.cmsDetailService.createCmsDetail(this.cmsDetail)
        .then((doc) => {
          this.cmsDetail.key = doc.id;
          this.cmsDetailService.updateCmsDetail(this.cmsDetail)
            .then(() => {
              this.alertService.toast(`Le contenu cms est ajoutée ${this.cmsDetail.title}`, 'info');
              this.reset();
            });
        });
    }
  }

  reset() {
    this.form.reset({
      title: '',
      content: '',
      parent: null
    });
    this.cmsDetail = null;
  }

  get title() {
    return this.form.get('title');
  }
}
