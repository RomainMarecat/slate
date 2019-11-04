import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ContactModule } from '../../../contact/contact.module';
import { ContactService } from '../../../contact/shared/contact.service';
import { MockContactService } from '../../../contact/shared/mock-contact.service';
import { MaterialModule } from '../../../material/material.module';
import { PopupModule } from '../../../popup/popup.module';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

import { PricingStyle2Component } from './pricing-style2.component';

describe('PricingStyle2Component', () => {
  let component: PricingStyle2Component;
  let fixture: ComponentFixture<PricingStyle2Component>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PopupModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        MaterialModule,
        FormsModule,
        ContactModule,
        ReactiveFormsModule
      ],
      declarations: [PricingStyle2Component],
      providers: [
        {provide: ContactService, useClass: MockContactService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
