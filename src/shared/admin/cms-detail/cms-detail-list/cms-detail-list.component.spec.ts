import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule, MatFormFieldModule,
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../../cms-detail/shared/mock-cms-detail.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';

import { CmsDetailListComponent } from './cms-detail-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CmsService } from 'shared/cms/shared/cms.service';
import { MockCmsService } from 'shared/cms/shared/mock-cms.service';

describe('CmsDetailListComponent', () => {
  let component: CmsDetailListComponent;
  let fixture: ComponentFixture<CmsDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FlexLayoutModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatListModule,
        MatSelectModule,
        MatToolbarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [CmsDetailListComponent],
      providers: [
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: CmsService, useClass: MockCmsService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
