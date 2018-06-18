import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptinListComponent } from './optin-list.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OptinManagerComponent } from '../optin-manager/optin-manager.component';
import { OptinNewsletterComponent } from '../optin-newsletter/optin-newsletter.component';
import { SharedModule } from 'shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockAlertService } from 'shared/popup/mock-alert.service';
import { AlertService } from 'shared/popup/alert.service';

describe('OptinListComponent', () => {
  let component: OptinListComponent;
  let fixture: ComponentFixture<OptinListComponent>;

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
        OptinNewsletterComponent
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
