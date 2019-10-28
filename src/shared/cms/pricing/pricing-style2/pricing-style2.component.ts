import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../../contact/shared/contact';
import { ContactService } from '../../../contact/shared/contact.service';
import { AlertService } from '../../../popup/alert.service';

@Component({
  selector: 'app-pricing-style2',
  templateUrl: './pricing-style2.component.html',
  styleUrls: ['./pricing-style2.component.scss']
})
export class PricingStyle2Component implements OnInit {
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
      lastname: this.formBuilder.control('',
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      firstname: this.formBuilder.control('',
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      zipcode: this.formBuilder.control('',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      email: this.formBuilder.control('',
        [Validators.required, Validators.minLength(3), Validators.email, Validators.maxLength(100)]),
      message: this.formBuilder.control('',
        [Validators.required, Validators.minLength(1), Validators.maxLength(8000)]),
    });
  }

  save() {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      const contact: Contact = {
        key: null,
        last_message: this.form.value.message,
        conversations: [],
        user: {
          displayName: `${this.form.value.lastname} ${this.form.value.firstname}`,
          email: this.form.value.email,
          uid: null,
          zipcode: this.form.value.zipcode
        },
        created_at: new Date(),
        updated_at: new Date(),
      };

      this.contactService.createContact(contact).subscribe((createdContact) => {
        this.isSaving = false;
        this.alertService.show('pricing2.form.success');
      }, () => {
        this.isSaving = false;
        this.alertService.show('pricing2.form.error');
      });
    }
  }
}
