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
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CmsService } from './../../shared/cms/cms.service';
import { MockCmsService } from './../../shared/cms/mock-cms.service';
import { MockAlertService } from '../../../../core/shared/alert/mock-alert.service';
import { AlertService } from '../../../../core/shared/alert/alert.service';

import { CmsAddComponent } from './cms-add.component';

describe('CmsAddComponent', () => {
  let component: CmsAddComponent;
  let fixture: ComponentFixture < CmsAddComponent > ;

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
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [CmsAddComponent],
        providers: [
          { provide: CmsService, useClass: MockCmsService },
          { provide: AlertService, useClass: MockAlertService },

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
