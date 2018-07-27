import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule
} from '@angular/material';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../../cms-detail/shared/mock-cms-detail.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { AlertService } from '../../../popup/alert.service';

import { CmsDetailAddComponent } from './cms-detail-add.component';
import { NgPipesModule } from 'ngx-pipes';
import { MockCmsService } from 'shared/cms/shared/mock-cms.service';
import { CmsService } from 'shared/cms/shared/cms.service';

describe('CmsDetailAddComponent', () => {
  let component: CmsDetailAddComponent;
  let fixture: ComponentFixture<CmsDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        MatSelectModule,
        MatToolbarModule,
        NgxEditorModule,
        NgPipesModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [CmsDetailAddComponent],
      providers: [
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: CmsService, useClass: MockCmsService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
