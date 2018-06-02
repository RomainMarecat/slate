import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { DocumentReference } from '@firebase/firestore-types';
import { PartnerFormType } from '../../shared/partner/form-partner';
import { PartnerService } from 'shared/partner/partner.service';
import { Partner } from 'shared/partner/partner';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: [ './partner-edit.component.scss' ]
})
export class PartnerEditComponent implements OnInit {
  @Input() showBackButton = true;

  form: FormGroup;
  partner: Partner;
  _publication = true;

  constructor(private partnerService: PartnerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.createForm();
    this.getPartner();
  }

  getPartner() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key;
        this.partnerService.getPartner(key)
          .subscribe((partner: Partner) => {
            this.partner = partner;
            this.createForm();
          });
      }
    });
  }

  reset() {
    this.form.reset({
      name: '',
      website: '',
      published: true,
    });
  }

  savePartner() {
    this.form.patchValue({
      published: this._publication
    });
    if (this.form.valid) {
      this.partner = {...this.partner, ...this.form.value};
      if (this.partner.key) {
        if (this.partner.published === true) {
          this.partner.published_at = new Date();
        }
        this.partnerService.updatePartner(this.partner)
          .then((doc) => {
            this.alertService.toast(`partner updated ${this.partner.name}`);
            this.reset();
          }, (err) => {
            this.alertService.toast(`partner error ${err}`);
          });
        this.router.navigate([ '/admin/partner' ]);
      } else {
        this.partnerService.createPartner(this.partner)
          .then((doc: DocumentReference) => {
            this.alertService.toast(`partner added ${doc.id}`);
            this.reset();
          }, (err) => {
            this.alertService.toast(`partner error ${err}`);
          });
      }
    }
  }

  createForm() {
    const formType = new PartnerFormType(this.partner);
    this.form = formType.getForm();
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({name: name});
  }

  get website() {
    return this.form.get('website');
  }

  set website(website) {
    this.form.patchValue({website: website});
  }

  get published() {
    return this.form.get('published');
  }

  set published(published) {
    this.form.patchValue({published: published});
  }

  get publication() {
    return this._publication;
  }

  set publication(publication) {
    this._publication = publication;
  }
}
