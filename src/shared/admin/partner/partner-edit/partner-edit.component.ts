import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DocumentReference } from '@firebase/firestore-types';
import { PartnerFormType } from '../../shared/partner/form-partner';
import { PartnerService } from '../../../partner/partner.service';
import { Partner } from '../../../partner/partner';
import { AlertService } from '../../../popup/alert.service';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})
export class PartnerEditComponent implements OnInit {
  @Input() showBackButton = true;

  form: FormGroup;

  partner: Partner;

  constructor(private partnerService: PartnerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private localizeRouterService: LocalizeRouterService) {
    this.createForm();
  }

  ngOnInit() {
    this.getPartner();
  }

  getPartner() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
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
        this.router.navigate([
          this.localizeRouterService.translateRoute('/admin'),
          'partner'
        ]);
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
}
