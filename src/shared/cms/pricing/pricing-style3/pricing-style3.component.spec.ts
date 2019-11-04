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

import { PricingStyle3Component } from './pricing-style3.component';

describe('PricingStyle3Component', () => {
  let component: PricingStyle3Component;
  let fixture: ComponentFixture<PricingStyle3Component>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        PopupModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ContactModule
      ],
      declarations: [PricingStyle3Component],
      providers: [
        {provide: ContactService, useClass: MockContactService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingStyle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
