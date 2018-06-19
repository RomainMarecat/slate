import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'shared/popup/alert.service';

@Component({
  selector: 'app-optin-manager',
  templateUrl: './optin-manager.component.html',
  styleUrls: ['./optin-manager.component.scss']
})
export class OptinManagerComponent implements OnInit {

  form: FormGroup = OptinManagerComponent.getForm();

  static getForm(): FormGroup {
    return new FormGroup({
      optinEmail: new FormControl(false),
      optinOffline: new FormControl(false),
      optinComment: new FormControl(false),
      optinFollow: new FormControl(false),
      optinMessage: new FormControl(false),
      optinStats: new FormControl(false),
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
