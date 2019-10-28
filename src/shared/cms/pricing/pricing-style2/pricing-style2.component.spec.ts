import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingStyle2Component } from './pricing-style2.component';

describe('PricingStyle2Component', () => {
  let component: PricingStyle2Component;
  let fixture: ComponentFixture<PricingStyle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingStyle2Component ]
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
