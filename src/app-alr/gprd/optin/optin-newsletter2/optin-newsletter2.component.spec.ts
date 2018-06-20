import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptinNewsletter2Component } from './optin-newsletter2.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'shared/popup/alert.service';
import { MockAlertService } from 'shared/popup/mock-alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OptinNewsletter2Component', () => {
  let component: OptinNewsletter2Component;
  let fixture: ComponentFixture<OptinNewsletter2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [OptinNewsletter2Component],
      providers: [
        {provide: AlertService, useClass: MockAlertService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptinNewsletter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
