import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { CmsDetail } from '../../../cms-detail/shared/cms-detail';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { Filter } from '../../../facet/filter/shared/filter';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cms-detail-add',
  templateUrl: './cms-detail-add.component.html',
  styleUrls: ['./cms-detail-add.component.scss']
})
export class CmsDetailAddComponent implements OnInit {
  form: FormGroup = CmsDetailAddComponent.createForm();
  cmsDetails: CmsDetail[] = [];
  cmsDetail: CmsDetail;
  cmsKey: string;
  editorConfig: any;
  cmsDetailList: Array<CmsDetail> = CmsDetailAddComponent.getCmsDetailList();

  /**
   * Get best used cms details
   * @returns {Array<CmsDetail>}
   */
  static getCmsDetailList(): Array<CmsDetail> {
    return [
      {
        title: 'faq.general-question',
        content: `<div>New Comer? Start with the basic</div>`,
        cms: '',
        icon: 'help',
      }
    ];
  }

  /**
   * return form of Cms Detail
   * @returns {FormGroup}
   */
  private static createForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      icon: new FormControl(null),
      content: new FormControl('', [
        Validators.required,
      ]),
      parent: new FormControl(null)
    });
  }

  /**
   *
   * @param {TranslateService} translate
   * @param {CmsDetailService} cmsDetailService
   * @param {AlertService} alertService
   * @param {ActivatedRoute} activeRoute
   */
  constructor(private translate: TranslateService,
              private cmsDetailService: CmsDetailService,
              private alertService: AlertService,
              private activeRoute: ActivatedRoute) {
    this.cmsKey = null;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((value: {key: string}) => {
      this.cmsKey = value.key;
      this.getCmsDetails(this.cmsKey);
    });

    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '5rem',
      'minHeight': '2rem',
      'placeholder': this.translate.instant('admin.placeholder.cms-detail.content'),
      'translate': 'no',
      'toolbar': []
    };
  }

  /**
   * Get cms details array by cms key
   * @param {string} cms
   */
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
      }] as Filter[]);
    this.cmsDetailService.getCmsDetails()
      .subscribe((cmsDetails: CmsDetail[]) => {
        this.cmsDetails = cmsDetails;
      });
  }

  /**
   * Add an existing cms detail key
   * @param cmsDetail
   */
  addCmsDetail(cmsDetail: CmsDetail) {
    this.translate.get(cmsDetail.title)
      .subscribe((title) => {
        this.cmsDetail = {
          title: title,
          content: cmsDetail.content,
          cms: this.cmsKey
        };
        this.createCmsDetail();
      });
  }

  /**
   * Save by Form Group
   */
  saveCmsDetail() {
    if (this.form.valid === true && this.cmsKey !== null) {
      this.cmsDetail = this.form.value;
      this.cmsDetail.cms = this.cmsKey;
      this.createCmsDetail();
    }
  }

  /**
   * Api Call to save a new cmd Detail
   */
  createCmsDetail() {
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

  /**
   * Reset form
   */
  reset() {
    this.form.reset({
      title: '',
      content: '',
      parent: null
    });
    this.cmsDetail = null;
  }
}
