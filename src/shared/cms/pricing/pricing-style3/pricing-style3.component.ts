import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../../contact/shared/contact';
import { ContactService } from '../../../contact/shared/contact.service';
import { AlertService } from '../../../popup/alert.service';

@Component({
  selector: 'app-pricing-style3',
  templateUrl: './pricing-style3.component.html',
  styleUrls: ['./pricing-style3.component.scss']
})
export class PricingStyle3Component implements OnInit {
  form: FormGroup;
  isSaving: boolean;

  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService,
              private alertService: AlertService) {
    this.form = this.getForm();
  }

  ngOnInit() {
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      phone: this.formBuilder.control('',
        [Validators.required, Validators.minLength(10), Validators.maxLength(18)]),
    });
  }

  save() {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      const contact: Contact = {
        key: null,
        last_message: '',
        conversations: [],
        user: {
          displayName: '',
          email: '',
          uid: null,
          phone: this.form.value.phone
        },
        created_at: new Date(),
        updated_at: new Date(),
      };

      this.contactService.createContact(contact).subscribe((createdContact) => {
        this.isSaving = false;
        this.alertService.show('pricing3.form.success');
      }, () => {
        this.isSaving = false;
        this.alertService.show('pricing3.form.error');
      });
    }
  }

}
