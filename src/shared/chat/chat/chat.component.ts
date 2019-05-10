import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Contact } from '../../contact/shared/contact';
import { ContactService } from '../../contact/shared/contact.service';
import { ChatConfiguration } from '../shared/chat-configuration';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() configuration: ChatConfiguration = {
    style: {
      'min-height': '400px'
    }
  };

  opened: boolean;

  @Input() contacts: Contact[] = [];

  selectedContact: Contact;

  constructor(private contactService: ContactService,
              private mediaObserver: MediaObserver) {
    this.opened = true;
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      if (changes.length > 0) {
        this.opened = changes[0].mqAlias !== 'xs';
      }
    });
  }

  ngOnInit() {
    this.contactService.contactSelected.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}
