import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMonoCardComponent } from './booking-mono-card.component';

describe('BookingMonoCardComponent', () => {
  let component: BookingMonoCardComponent;
  let fixture: ComponentFixture<BookingMonoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingMonoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingMonoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
