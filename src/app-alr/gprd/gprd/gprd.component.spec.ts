import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GprdComponent } from './gprd.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockAlertService } from 'shared/popup/mock-alert.service';
import { AlertService } from 'shared/popup/alert.service';
import { OptinModule } from '../optin/optin.module';
import { HelpModule } from '../help/help.module';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('GprdComponent', () => {
  let component: GprdComponent;
  let fixture: ComponentFixture<GprdComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
        OptinModule,
        HelpModule,
        RouterTestingModule,
        SharedModule,
        MatIconModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        GprdComponent
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GprdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
