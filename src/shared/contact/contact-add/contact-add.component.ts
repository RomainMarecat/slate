import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@firebase/auth-types';
import { DocumentReference } from '@firebase/firestore-types';
import { TranslateService } from '@ngx-translate/core';
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
    this.seoService.setSeo('contact-add');
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
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.contact = {
        key: null,
        last_message: this.form.value.message,
        user: {
          uid: this.form.value.uid,
          displayName: this.form.value.name,
          email: this.form.value.email,
          photoURL: this.form.value.photoURL,
        },
        created_at: new Date(),
        updated_at: new Date(),
        conversations: []
      };
      this.contactService.createContact(this.contact)
        .subscribe((doc: DocumentReference) => {
          this.contact.key = doc.id;

          const conversation: Conversation = {
            key: null,
            message: this.form.value.message,
            contact: doc.id,
            user: {
              uid: this.form.value.uid,
              displayName: this.form.value.name,
              email: this.form.value.email,
              photoURL: this.form.value.photoURL,
            },
            created_at: new Date(),
            updated_at: new Date()
          };
          this.conversationService.createConversation(conversation)
            .subscribe((docConversation: DocumentReference) => {
              conversation.key = docConversation.id;
              this.contact.conversations.push(conversation.key);

              this.contactService.updateContact(this.contact)
                .subscribe(() => {
                  this.translateService.get(`contact.message.added`)
                    .subscribe(trans => {
                      this.alertService.show(trans);
                      this.router.navigate(['/']);
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
