import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../contact/shared/contact';

@Component({
  selector: 'app-chat-sidenav-right',
  templateUrl: './chat-sidenav-right.component.html',
  styleUrls: ['./chat-sidenav-right.component.scss']
})
export class ChatSidenavRightComponent implements OnInit {

  @Input() contact: Contact;

  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() toggleSidenavRight: EventEmitter<{open: boolean, content: string}> = new EventEmitter<{open: boolean, content: string}>();


  constructor() {
  }

  ngOnInit() {
  }

}
