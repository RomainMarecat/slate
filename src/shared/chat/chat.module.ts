import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { NgPipesModule } from 'ngx-pipes';
import { SharedLayoutBuilderModule } from '../layout-builder/shared-layout-builder.module';
import { MaterialModule } from '../material/material.module';
import { ChatContactInfoComponent } from './chat-contact-info/chat-contact-info.component';
import { ChatConversationStartComponent } from './chat-conversation-start/chat-conversation-start.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { ChatSidenavContactComponent } from './chat-sidenav-contact/chat-sidenav-contact.component';
import { ChatSidenavHeaderComponent } from './chat-sidenav-header/chat-sidenav-header.component';
import { ChatSidenavLeftComponent } from './chat-sidenav-left/chat-sidenav-left.component';
import { ChatSidenavContentComponent } from './chat-sidenav-right/chat-sidenav-content.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    ChatSidenavContactComponent,
    ChatConversationComponent,
    ChatComponent,
    ChatSidenavLeftComponent,
    ChatSidenavContentComponent,
    ChatSidenavHeaderComponent,
    ChatConversationStartComponent,
    ChatContactInfoComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    LocalizeRouterModule,
    RouterModule,
    MaterialModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedLayoutBuilderModule
  ]
})
export class ChatModule {
}
