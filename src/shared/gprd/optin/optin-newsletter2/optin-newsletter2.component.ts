import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OptinNewsletterComponent } from '../optin-newsletter/optin-newsletter.component';
import { AlertService } from 'shared/popup/alert.service';

@Component({
  selector: 'app-optin-newsletter2',
  templateUrl: './optin-newsletter2.component.html',
  styleUrls: [ './optin-newsletter2.component.scss' ]
})
export class OptinNewsletter2Component implements OnInit {

  form: FormGroup = OptinNewsletterComponent.getForm();

  static getForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [ Validators.required ]),
      optinEmail: new FormControl(false),
    });
  }

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {
      this.alertService.show('gprd.optin.save.success');
    }
  }
}
