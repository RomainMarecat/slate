import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { PartnerEditComponent } from './../partner-edit/partner-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { MenuService } from '../../../menu/menu.service';
import { PartnerListComponent } from './partner-list.component';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { PartnerService } from 'shared/partner/partner.service';
import { MockPartnerService } from 'shared/partner/mock-partner.service';

describe('PartnerListComponent', () => {
  let component: PartnerListComponent;
  let fixture: ComponentFixture<PartnerListComponent>;

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
      declarations: [ PartnerListComponent, PartnerEditComponent ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: MenuService, useClass: MenuService},
        {provide: PartnerService, useClass: MockPartnerService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
