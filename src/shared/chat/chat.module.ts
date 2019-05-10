import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { MaterialModule } from '../material/material.module';
import { ChatSidenavContactComponent } from './chat-sidenav-contact/chat-sidenav-contact.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { ChatComponent } from './chat/chat.component';
import { ChatSidenavLeftComponent } from './chat-sidenav-left/chat-sidenav-left.component';
import { ChatSidenavRightComponent } from './chat-sidenav-right/chat-sidenav-right.component';
import { ChatSidenavHeaderComponent } from './chat-sidenav-header/chat-sidenav-header.component';
import { ChatConversationStartComponent } from './chat-conversation-start/chat-conversation-start.component';

@NgModule({
  declarations: [
    ChatSidenavContactComponent,
    ChatConversationComponent,
    ChatComponent,
    ChatSidenavLeftComponent,
    ChatSidenavRightComponent,
    ChatSidenavHeaderComponent,
    ChatConversationStartComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule
  ]
})
export class ChatModule {
}
