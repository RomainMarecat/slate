import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { PricingStyle1Component } from './pricing-style1.component';

describe('PricingStyle1Component', () => {
  let component: PricingStyle1Component;
  let fixture: ComponentFixture<PricingStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ PricingStyle1Component ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
