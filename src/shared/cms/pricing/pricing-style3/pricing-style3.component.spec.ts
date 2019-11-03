import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingStyle3Component } from './pricing-style3.component';

describe('PricingStyle3Component', () => {
  let component: PricingStyle3Component;
  let fixture: ComponentFixture<PricingStyle3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingStyle3Component ]
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
