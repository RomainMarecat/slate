import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact/shared/contact';
import { ContactService } from '../../contact/shared/contact.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() contacts: Contact[] = [];

  selectedContact: Contact;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.contactSelected.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}
