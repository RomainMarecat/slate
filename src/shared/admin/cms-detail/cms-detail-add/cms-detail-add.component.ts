import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { CmsDetail } from '../../../cms-detail/shared/cms-detail';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { Filter } from '../../../facet/filter/shared/filter';
import { TranslateService } from '@ngx-translate/core';
import { Cms } from 'shared/cms/shared/cms';
import { CmsService } from 'shared/cms/shared/cms.service';

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
  cms: Cms;
  editorConfig: any;
  cmsDetailList: Array<CmsDetail> = CmsDetailAddComponent.getCmsDetailList();
  cmsUsedDisabled = false;

  /**
   * Get best used cms details
   */
  static getCmsDetailList(): Array<CmsDetail> {
    return [
      {
        title: 'faq.general-question',
        content: `<div>New Comer? Start with the basic</div>`,
        cms: 'faq.links',
        icon: 'help',
      },
      {
        title: 'faq.shipping',
        content: `<div>Know more about shipping</div>`,
        cms: 'faq.links',
        icon: 'local_shipping',
      },
      {
        title: 'faq.about-service',
        content: `<div>Know more about our features</div>`,
        cms: 'faq.links',
        icon: 'question_answer',
      },
      {
        title: 'faq.buyandsell',
        content: `<div>Know more about Buy & Sell</div>`,
        cms: 'faq.links',
        icon: 'attach_money',
      },
      {
        title: 'faq.privacyandpolicy',
        content: `<div>We take our security strict</div>`,
        cms: 'faq.links',
        icon: 'security',
      },
      {
        title: 'footer.title.gprd',
        content: `gprd`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.legal-information',
        content: `legal-information`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.who-are-us',
        content: `who-are-us`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.cgv',
        content: `cgv`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.help',
        content: `help`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.cgu',
        content: `cgu`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.solutions-pro',
        content: `solutions-pro`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.advert',
        content: `advert`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.professional',
        content: `professional`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.about',
        content: `about`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.hiring',
        content: `hiring`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.questions',
        content: `questions`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.contact',
        content: `contact`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.privacy-policy',
        content: `privacy-policy`,
        cms: 'footer.links',
        icon: '',
      },
      {
        title: 'footer.title.join-us',
        content: `join-us`,
        cms: 'footer.links',
        icon: '',
      },
    ];
  }

  /**
   * return form of Cms Detail
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

  constructor(private translate: TranslateService,
              private cmsDetailService: CmsDetailService,
              private cmsService: CmsService,
              private alertService: AlertService,
              private activeRoute: ActivatedRoute) {
    this.cmsKey = null;
  }

  ngOnInit() {
    this.activeRoute.params
      .subscribe((value: {key: string}) => {
        this.cmsKey = value.key;
        this.getCms(this.cmsKey);
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

  getCms(key: string) {
    this.cmsService.getCms(key)
      .subscribe((cms) => {
        this.cms = cms;
      });
  }

  /**
   * Get cms details array by cms key
   */
  getCmsDetails(cms: string) {
    this.cmsDetailService.filters$.next(
      [
        {
          column: 'cms',
          operator: '==',
          value: cms
        }
      ] as Filter[]
    );
    this.cmsDetailService.getCmsDetails()
      .subscribe((cmsDetails: CmsDetail[]) => {
        this.cmsDetails = cmsDetails;
      });
  }

  /**
   * Add an existing cms detail key
   */
  addCmsDetail(cmsDetail: CmsDetail) {
    let included = false;
    this.cmsDetails.forEach((cd) => {
      if (cmsDetail.title === cd.title) {
        included = true;
      }
    });
    if (included === false) {
      this.cmsUsedDisabled = true;

      this.cmsDetail = {
        title: cmsDetail.title,
        icon: cmsDetail.icon,
        content: cmsDetail.content,
        cms: this.cmsKey
      };
      this.createCmsDetail();
    } else {
      this.alertService.show('admin.title.cms-detail.already-exist');
    }

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
            this.cmsUsedDisabled = false;
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
