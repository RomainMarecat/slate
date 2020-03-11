import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CmsService } from '../../../cms/shared/cms.service';
import { MockCmsService } from '../../../cms/shared/mock-cms.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { AlertService } from '../../../popup/alert.service';

import { CmsAddComponent } from './cms-add.component';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('CmsAddComponent', () => {
  let component: CmsAddComponent;
  let fixture: ComponentFixture<CmsAddComponent>;

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
        MatToolbarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [CmsAddComponent],
      providers: [
        {provide: CmsService, useClass: MockCmsService},
        {provide: AlertService, useClass: MockAlertService},

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
