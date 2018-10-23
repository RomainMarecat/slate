import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { PartnerEditComponent } from './partner-edit.component';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { PartnerService } from 'shared/partner/partner.service';
import { MockPartnerService } from 'shared/partner/mock-partner.service';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from 'shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('PartnerEditComponent', () => {
  let component: PartnerEditComponent;
  let fixture: ComponentFixture<PartnerEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        LocalizeRouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule,
      ],
      declarations: [PartnerEditComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: PartnerService, useClass: MockPartnerService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
