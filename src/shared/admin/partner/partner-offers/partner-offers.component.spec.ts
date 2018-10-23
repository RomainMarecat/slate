import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOffersComponent } from './partner-offers.component';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('PartnerOffersComponent', () => {
  let component: PartnerOffersComponent;
  let fixture: ComponentFixture<PartnerOffersComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerOffersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
