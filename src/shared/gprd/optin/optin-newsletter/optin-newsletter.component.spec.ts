import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptinNewsletterComponent } from './optin-newsletter.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared.module';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('OptinNewsletterComponent', () => {
  let component: OptinNewsletterComponent;
  let fixture: ComponentFixture<OptinNewsletterComponent>;

  configureTestSuite();

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
      declarations: [OptinNewsletterComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptinNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
