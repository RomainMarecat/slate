import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../contact/shared/contact';

@Component({
  selector: 'app-chat-contact-info',
  templateUrl: './chat-contact-info.component.html',
  styleUrls: ['./chat-contact-info.component.scss']
})
export class ChatContactInfoComponent implements OnInit {

  @Output() toggleContactInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() contact: Contact;

  constructor() {
  }

  ngOnInit() {
  }

}
