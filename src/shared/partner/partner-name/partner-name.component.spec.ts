import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerNameComponent } from './partner-name.component';

describe('PartnerNameComponent', () => {
  let component: PartnerNameComponent;
  let fixture: ComponentFixture<PartnerNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
