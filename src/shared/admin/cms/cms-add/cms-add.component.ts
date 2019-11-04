import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../cms/shared/cms.service';
import { Cms } from '../../../cms/shared/cms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cms-add',
  templateUrl: './cms-add.component.html',
  styleUrls: ['./cms-add.component.scss']
})
export class CmsAddComponent implements OnInit {
  form: FormGroup = CmsAddComponent.getForm();
  cms: Cms;

  cmsList: Array<{key: string, name: string}> = CmsAddComponent.getCmsList();

  static getCmsList(): Array<{key: string, name: string}> {
    return [
      {
        key: 'footer.links',
        name: 'admin.cms.keys.footer'
      },
      {
        key: 'faq.links',
        name: 'admin.cms.keys.faq'
      }
    ];
  }

  /**
   * Return new Cms Form Group
   */
  static getForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      site_name: new FormControl('', [
        Validators.required,
      ])
    });
  }

  constructor(private cmsService: CmsService,
              private alertService: AlertService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
  }

  /**
   * Add an existing cms key
   */
  addCms(cms: {key: string, name: string}) {
    this.translateService.get(cms.name)
      .subscribe((translated) => {
        this.cms = {
          name: cms.key,
          site_name: translated
        };
        this.createCms();
      });
  }

  /**
   * Add new cms by form
   */
  saveCms() {
    if (this.form.valid === true) {
      this.cms = this.form.value;
      this.createCms();
    }
  }

  /**
   * Shared function to create cms with context cms
   */
  createCms() {
    this.cmsService.createCms(this.cms)
      .then((doc) => {
        this.cms.key = doc.id;
        this.cmsService.updateCms(this.cms)
          .then(() => {
            this.alertService.toast(`Le cms est ajoutée ${this.cms.name}`, {panelClass: 'info'});
            this.reset();
          });
      });
  }

  reset() {
    this.form.reset({
      name: '',
      site_name: ''
    });
    this.cms = null;
  }
}
