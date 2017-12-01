import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
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

import { CmsDetailService } from './../../shared/cms-detail/cms-detail.service';
import { MockCmsDetailService } from './../../shared/cms-detail/mock-cms-detail.service';
import { MockAlertService } from './../../../shared/alert/mock-alert.service';
import { AlertService } from './../../../shared/alert/alert.service';

import { CmsDetailAddComponent } from './cms-detail-add.component';

describe('CmsDetailAddComponent', () => {
  let component: CmsDetailAddComponent;
  let fixture: ComponentFixture < CmsDetailAddComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpModule,
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
        declarations: [CmsDetailAddComponent],
        providers: [
          { provide: CmsDetailService, useClass: MockCmsDetailService },
          { provide: AlertService, useClass: MockAlertService },

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
