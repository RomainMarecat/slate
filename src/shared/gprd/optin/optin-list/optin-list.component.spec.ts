import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptinListComponent } from './optin-list.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OptinManagerComponent } from '../optin-manager/optin-manager.component';
import { OptinNewsletterComponent } from '../optin-newsletter/optin-newsletter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OptinNewsletter2Component } from '../optin-newsletter2/optin-newsletter2.component';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { SharedModule } from '../../../shared.module';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';

describe('OptinListComponent', () => {
  let component: OptinListComponent;
  let fixture: ComponentFixture<OptinListComponent>;

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
      declarations: [
        OptinListComponent,
        OptinManagerComponent,
        OptinNewsletterComponent,
        OptinNewsletter2Component
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
