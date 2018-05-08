import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddComponent } from './contact-add.component';
import { MockContactService } from '../shared/mock-contact.service';
import { ContactService } from '../shared/contact.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
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

describe('ContactAddComponent', () => {
  let component: ContactAddComponent;
  let fixture: ComponentFixture<ContactAddComponent>;

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
        NgxEditorModule,
        NgxDatatableModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ ContactAddComponent ],
      providers: [
        {provide: ContactService, useClass: MockContactService},
        {provide: AlertService, useClass: MockAlertService},
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
