import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../../cms-detail/shared/mock-cms-detail.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { AlertService } from '../../../popup/alert.service';

import { CmsDetailAddComponent } from './cms-detail-add.component';
import { NgPipesModule } from 'ngx-pipes';
import { CmsService } from '../../../cms/shared/cms.service';
import { MockCmsService } from '../../../cms/shared/mock-cms.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('CmsDetailAddComponent', () => {
  let component: CmsDetailAddComponent;
  let fixture: ComponentFixture<CmsDetailAddComponent>;

  configureTestSuite();

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
