import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-conversation-start',
  templateUrl: './chat-conversation-start.component.html',
  styleUrls: ['./chat-conversation-start.component.scss']
})
export class ChatConversationStartComponent {
  sidenavState = false;

  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
}
