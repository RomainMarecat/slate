import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GprdComponent } from './gprd.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OptinModule } from '../optin/optin.module';
import { HelpModule } from '../help/help.module';
import { SeoModule } from '../../seo/seo.module';
import { SharedModule } from '../../shared.module';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
        SeoModule,
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
