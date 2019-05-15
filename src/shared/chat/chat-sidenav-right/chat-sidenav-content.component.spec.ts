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
import { ConversationService } from '../shared/conversation.service';
import { MockConversationService } from '../shared/mock-conversation.service';

import { ChatSidenavContentComponent } from './chat-sidenav-content.component';

describe('ChatSidenavContentComponent', () => {
  let component: ChatSidenavContentComponent;
  let fixture: ComponentFixture<ChatSidenavContentComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatSidenavContentComponent,
        ChatConversationStartComponent,
        ChatConversationComponent
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
    fixture = TestBed.createComponent(ChatSidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
