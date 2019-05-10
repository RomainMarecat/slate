import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact/shared/contact';

@Component({
  selector: 'app-chat-sidenav-right',
  templateUrl: './chat-sidenav-right.component.html',
  styleUrls: ['./chat-sidenav-right.component.scss']
})
export class ChatSidenavRightComponent implements OnInit {

  @Input() contact: Contact;

  constructor() {
  }

  ngOnInit() {
  }

}
