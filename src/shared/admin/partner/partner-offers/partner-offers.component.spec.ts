import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOffersComponent } from './partner-offers.component';

describe('PartnerOffersComponent', () => {
  let component: PartnerOffersComponent;
  let fixture: ComponentFixture<PartnerOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerOffersComponent ]
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
