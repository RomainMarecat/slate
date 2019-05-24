import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../contact/shared/contact';

@Component({
  selector: 'app-chat-sidenav-content',
  templateUrl: './chat-sidenav-content.component.html',
  styleUrls: ['./chat-sidenav-content.component.scss']
})
export class ChatSidenavContentComponent implements OnInit {

  @Input() contact: Contact;

  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() toggleSidenavRight: EventEmitter<{open: boolean, content: string}> = new EventEmitter<{open: boolean, content: string}>();


  constructor() {
  }

  ngOnInit() {
  }

}
