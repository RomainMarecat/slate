import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact/shared/contact';

@Component({
  selector: 'app-chat-sidenav-left',
  templateUrl: './chat-sidenav-left.component.html',
  styleUrls: ['./chat-sidenav-left.component.scss']
})
export class ChatSidenavLeftComponent implements OnInit {

  @Input() contacts: Contact[] = [];

  constructor() { }

  ngOnInit() {
  }

}
