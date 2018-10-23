import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferComponent } from './offer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('OfferComponent', () => {
  let component: OfferComponent;
  let fixture: ComponentFixture<OfferComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [OfferComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
