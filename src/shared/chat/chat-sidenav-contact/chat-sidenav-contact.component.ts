import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../contact/shared/contact';
import { ContactService } from '../../contact/shared/contact.service';
import { ConversationService } from '../shared/conversation.service';

@Component({
  selector: 'app-chat-sidenav-contact',
  templateUrl: './chat-sidenav-contact.component.html',
  styleUrls: ['./chat-sidenav-contact.component.scss']
})
export class ChatSidenavContactComponent implements OnInit {

  _contacts: Contact[] = [];

  @Output() contactSelected: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  onContactSelected(contact: Contact) {
    this.contactSelected.emit(contact);
    this.contactService.contactSelected.next(contact);
  }

  @Input() set contacts(contacts: Contact[]) {
    this._contacts = contacts;
  }

  get contacts(): Contact[] {
    return this._contacts;
  }
}
