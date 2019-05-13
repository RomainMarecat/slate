import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@firebase/auth-types';
import { Subscription } from 'rxjs';
import { Contact } from '../../contact/shared/contact';
import { UserService } from '../../user/shared/user.service';
import { Conversation } from '../shared/conversation';
import { ConversationService } from '../shared/conversation.service';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit {

  _contact: Contact;

  user: User;

  conversations: Conversation[] = [];

  conversationSubscription: Subscription;

  form: FormGroup = ChatConversationComponent.getForm();

  sidenavState = false;

  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() toggleContactInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  static getForm(): FormGroup {
    return new FormGroup({
      message: new FormControl('', [Validators.required])
    });
  }

  constructor(private conversationService: ConversationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAuthStateUser().subscribe((user) => {
      this.user = user;
    });
  }

  addMessage() {
    if (this.form.valid) {
      const conversation: Conversation = {
        key: null,
        message: this.form.value.message,
        contact: this.contact.key,
        user: {
          uid: this.user.uid,
          displayName: this.user.displayName,
          email: this.user.email,
          photoURL: this.user.photoURL
        },
        created_at: new Date(),
        updated_at: new Date(),
      };

      this.conversationService.createConversation(conversation)
        .subscribe((doc: DocumentReference) => {
          conversation.key = doc.id;
          this.conversationService.updateConversation(conversation)
            .subscribe(() => {
              this.form.reset();
            });
        });
    }
  }

  getConversations(contact: Contact) {
    this.conversationService.query$.next({
      filters: [
        {
          column: 'contact',
          operator: '==',
          value: contact.key
        }
      ],
      limit: 100,
      orderBy: {
        column: 'created_at',
        direction: 'asc'
      }
    });
    this.conversationSubscription = this.conversationService.getConversations()
      .subscribe((conversations: Conversation[]) => {
        this.conversations = conversations;
      });
  }


  @Input() set contact(contact: Contact) {
    if (contact) {
      this._contact = contact;
      if (this.conversationSubscription) {
        this.conversationSubscription.unsubscribe();
      }
      this.getConversations(contact);
    }
  }

  get contact(): Contact {
    return this._contact;
  }

}
