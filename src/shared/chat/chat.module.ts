import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { NgPipesModule } from 'ngx-pipes';
import { LayoutBuilderModule } from '../layout-builder/layout-builder.module';
import { MaterialModule } from '../material/material.module';
import { ChatSidenavContactComponent } from './chat-sidenav-contact/chat-sidenav-contact.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { ChatComponent } from './chat/chat.component';
import { ChatSidenavLeftComponent } from './chat-sidenav-left/chat-sidenav-left.component';
import { ChatSidenavRightComponent } from './chat-sidenav-right/chat-sidenav-right.component';
import { ChatSidenavHeaderComponent } from './chat-sidenav-header/chat-sidenav-header.component';
import { ChatConversationStartComponent } from './chat-conversation-start/chat-conversation-start.component';
import { ChatContactInfoComponent } from './chat-contact-info/chat-contact-info.component';

@NgModule({
  declarations: [
    ChatSidenavContactComponent,
    ChatConversationComponent,
    ChatComponent,
    ChatSidenavLeftComponent,
    ChatSidenavRightComponent,
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
    LayoutBuilderModule
  ]
})
export class ChatModule {
}
