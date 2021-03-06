import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerImportComponent } from './partner-import.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { SharedModule } from '../../../shared.module';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { PartnerService } from '../../../partner/partner.service';
import { MockPartnerService } from '../../../partner/mock-partner.service';

describe('PartnerImportComponent', () => {
  let component: PartnerImportComponent;
  let fixture: ComponentFixture<PartnerImportComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule,
      ],
      declarations: [PartnerImportComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: PartnerService, useClass: MockPartnerService}
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
