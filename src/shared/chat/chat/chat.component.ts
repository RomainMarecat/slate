import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
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

  @ViewChild('sidenavRight', {static: false}) sidenavRight: MatSidenav;

  selectedContact: Contact;

  selectedContentSidenavRight: string;

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

  toggleSidenavRight(event: {open: boolean, content: string}) {
    if (event.open) {
      this.sidenavRight.open();
    }
    this.selectedContentSidenavRight = event.content;
  }
}
