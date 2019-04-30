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
import { ChatSidenavContactComponent } from '../chat-sidenav-contact/chat-sidenav-contact.component';
import { ChatSidenavHeaderComponent } from '../chat-sidenav-header/chat-sidenav-header.component';
import { ConversationService } from '../shared/conversation.service';
import { MockConversationService } from '../shared/mock-conversation.service';

import { ChatSidenavLeftComponent } from './chat-sidenav-left.component';

describe('ChatSidenavLeftComponent', () => {
  let component: ChatSidenavLeftComponent;
  let fixture: ComponentFixture<ChatSidenavLeftComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatSidenavLeftComponent,
        ChatSidenavHeaderComponent,
        ChatSidenavContactComponent
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
    fixture = TestBed.createComponent(ChatSidenavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
