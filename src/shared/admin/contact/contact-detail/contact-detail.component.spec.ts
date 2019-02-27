import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailComponent } from './contact-detail.component';
import { ContactService } from '../../../contact/shared/contact.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../../../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockContactService } from '../../../contact/shared/mock-contact.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { DateService } from '../../../util/date.service';
import { MenuService } from '../../../menu/menu.service';
import { ObjectService } from '../../../util/object.service';
import { I18nService } from '../../../i18n/i18n.service';
import { DeviceService } from '../../../device/device.service';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxEditorModule,
        NgxDatatableModule,
        LocalizeRouterModule,
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
      declarations: [ContactDetailComponent],
      providers: [
        {provide: ContactService, useClass: MockContactService},
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
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
