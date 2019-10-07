import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/app';
import { DocumentReference } from '@firebase/firestore-types';
import { TranslateService } from '@ngx-translate/core';
import { ChatConfiguration } from '../../chat/shared/chat-configuration';
import { Conversation } from '../../chat/shared/conversation';
import { ConversationService } from '../../chat/shared/conversation.service';
import { AlertService } from '../../popup/alert.service';
import { SeoService } from '../../seo/shared/seo.service';
import { UserService } from '../../user/shared/user.service';
import { Contact } from '../shared/contact';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent {
  form: FormGroup = ContactAddComponent.getForm();
  contact: Contact;
  user: User;
  previousContacts: Contact[] = [];
  chatConfiguration: ChatConfiguration = {
    style: {
      'min-height': '500px'
    }
  };

  static getForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      photoURL: new FormControl(null),
      uid: new FormControl(null),
    });
  }

  constructor(private seoService: SeoService,
              private contactService: ContactService,
              private conversationService: ConversationService,
              private alertService: AlertService,
              private router: Router,
              private translateService: TranslateService,
              private userService: UserService) {
    if (this.router.url.includes('contact')) {
      this.seoService.setSeo('contact-add');
    }
    this.getUser();
  }

  getUser() {
    this.userService.getAuthStateUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.form.patchValue({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });

        this.getContacts(user);
      }
    });
  }

  getContacts(user: User) {
    this.contactService.query$.next({
      orderBy: {
        direction: 'asc',
        column: 'created_at'
      },
      filters: [
        {
          column: 'user.uid',
          operator: '==',
          value: user.uid
        }
      ]
    });
    this.contactService.getContacts()
      .subscribe((contacts: Contact[]) => {
        this.previousContacts = contacts;
      });
  }

  getContactFromForm(form: FormGroup): Contact {
    return {
      key: null,
      last_message: form.value.message,
      user: {
        uid: form.value.uid,
        displayName: form.value.name,
        email: form.value.email,
        photoURL: form.value.photoURL,
      },
      created_at: new Date(),
      updated_at: new Date(),
      conversations: []
    };
  }

  getConversationFromForm(doc: DocumentReference, form: FormGroup): Conversation {
    return {
      key: null,
      message: form.value.message,
      contact: doc.id,
      user: {
        uid: form.value.uid,
        displayName: form.value.name,
        email: form.value.email,
        photoURL: form.value.photoURL,
      },
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.contact = this.getContactFromForm(this.form);
      this.contactService.createContact(this.contact)
        .subscribe((doc: DocumentReference) => {
          this.contact.key = doc.id;

          const conversation: Conversation = this.getConversationFromForm(doc, this.form);
          this.conversationService.createConversation(conversation)
            .subscribe((docConversation: DocumentReference) => {
              conversation.key = docConversation.id;
              this.contact.conversations.push(conversation.key);

              this.contactService.updateContact(this.contact)
                .subscribe(() => {
                  this.translateService.get(`contact.message.added`)
                    .subscribe(trans => {
                      this.alertService.show(trans);
                      this.contact = null;
                      this.form.reset();
                    });
                });
            });

        }, () => {
          this.alertService.show(`contact.message.error`);
        });
    }
  }
}
