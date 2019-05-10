import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { NgPipesModule } from 'ngx-pipes';
import { ContactService } from '../../contact/shared/contact.service';
import { MockContactService } from '../../contact/shared/mock-contact.service';
import { MaterialModule } from '../../material/material.module';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { ChatConversationStartComponent } from '../chat-conversation-start/chat-conversation-start.component';
import { ChatConversationComponent } from '../chat-conversation/chat-conversation.component';
import { ChatSidenavContactComponent } from '../chat-sidenav-contact/chat-sidenav-contact.component';
import { ChatSidenavHeaderComponent } from '../chat-sidenav-header/chat-sidenav-header.component';
import { ChatSidenavLeftComponent } from '../chat-sidenav-left/chat-sidenav-left.component';
import { ChatSidenavRightComponent } from '../chat-sidenav-right/chat-sidenav-right.component';
import { ConversationService } from '../shared/conversation.service';
import { MockConversationService } from '../shared/mock-conversation.service';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatComponent,
        ChatConversationComponent,
        ChatConversationStartComponent,
        ChatSidenavContactComponent,
        ChatSidenavHeaderComponent,
        ChatSidenavLeftComponent,
        ChatSidenavRightComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        LocalizeRouterModule,
        MaterialModule,
        NgPipesModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: ContactService, useClass: MockContactService},
        {provide: ConversationService, useClass: MockConversationService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
