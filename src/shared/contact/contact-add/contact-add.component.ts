import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../shared/contact.service';
import { Contact } from '../shared/contact';
import { AlertService } from '../../popup/alert.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DocumentReference } from '@firebase/firestore-types';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
  form: FormGroup = ContactAddComponent.getForm();
  contact: Contact;

  static getForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  constructor(private contactService: ContactService,
              private alertService: AlertService,
              private router: Router,
              private translate: TranslateService,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.contact = {...this.form.value};
      this.contactService.createContact(this.contact)
        .then((doc: DocumentReference) => {
          this.alertService.show(this.translate.instant(`contact.message.added`));
          this.router.navigate(['/']);
        }, (err) => {
          this.alertService.show(`contact.message.error`);
        });
    }
  }
}
