import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatModule } from '../../chat/chat.module';
import { ConversationService } from '../../chat/shared/conversation.service';
import { MockConversationService } from '../../chat/shared/mock-conversation.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';

import { ContactAddComponent } from './contact-add.component';
import { MockContactService } from '../shared/mock-contact.service';
import { ContactService } from '../shared/contact.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { DateService } from '../../util/date.service';
import { MenuService } from '../../menu/menu.service';
import { ObjectService } from '../../util/object.service';
import { I18nService } from '../../i18n/i18n.service';
import { DeviceService } from '../../device/device.service';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';

describe('ContactAddComponent', () => {
  let component: ContactAddComponent;
  let fixture: ComponentFixture<ContactAddComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule,
        ChatModule,
        LocalizeRouterModule,

        NgxDatatableModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ContactAddComponent],
      providers: [
        {provide: ContactService, useClass: MockContactService},
        {provide: ConversationService, useClass: MockConversationService},
        {provide: UserService, useClass: MockUserService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        DateService,
        MenuService,
        ObjectService,
        I18nService,
        DeviceService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
