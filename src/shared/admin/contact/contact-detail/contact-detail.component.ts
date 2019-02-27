import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../contact/shared/contact.service';
import { AlertService } from '../../../popup/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../../contact/shared/contact';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-blog-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private contactService: ContactService,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
    this.getContact();
  }

  getContact() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.contactService.getContact(key)
          .subscribe((contact: Contact) => {
            this.contact = contact;
          });
      }
    });
  }

  back() {
    this.router.navigate(
      [
        this.localizeRouterService.translateRoute('/admin'),
        'contact',
        'list'
      ]);
  }
}
