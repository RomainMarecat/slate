import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'shared/popup/alert.service';

@Component({
  selector: 'app-optin-newsletter',
  templateUrl: './optin-newsletter.component.html',
  styleUrls: ['./optin-newsletter.component.scss']
})
export class OptinNewsletterComponent implements OnInit {

  form: FormGroup = OptinNewsletterComponent.getForm();

  static getForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      optinEmail: new FormControl(false),
    });
  }

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
  }

  onSave() {
    if (this.form.valid) {
      this.alertService.show('gprd.optin.save.success');
    }
  }
}
