import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact/shared/contact';

@Component({
  selector: 'app-chat-sidenav-left',
  templateUrl: './chat-sidenav-left.component.html',
  styleUrls: ['./chat-sidenav-left.component.scss']
})
export class ChatSidenavLeftComponent {

  _contacts: Contact[] = [];

  filteredContacts: Contact[] = [];

  onSearch(search: string) {
    this._contacts = this.filteredContacts;
    this._contacts = this.contacts.filter((contact) => {
      return contact.user.displayName.toLowerCase().includes(search.toLowerCase()) ||
        contact.user.email.toLowerCase().includes(search.toLowerCase());
    });
  }

  @Input() set contacts(contacts: Contact[]) {
    this._contacts = contacts;
    this.filteredContacts = contacts;
  }

  get contacts(): Contact[] {
    return this._contacts;
  }
}
