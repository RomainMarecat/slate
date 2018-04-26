import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferConfirmationComponent } from './offer-confirmation.component';

describe('OfferConfirmationComponent', () => {
  let component: OfferConfirmationComponent;
  let fixture: ComponentFixture<OfferConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
