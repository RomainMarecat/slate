import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookingsService } from '../../../shared/services/bookings.service';
import { BookingMonoCardModule } from '../booking-mono-card/booking-mono-card.module';
import { BookingSummaryModule } from '../booking-summary/booking-summary.module';

import { BookingConfirmComponent } from './booking-confirm.component';

describe('BookingConfirmComponent', () => {
  let component: BookingConfirmComponent;
  let fixture: ComponentFixture<BookingConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BookingSummaryModule,
        BookingMonoCardModule
      ],
      declarations: [BookingConfirmComponent],
      providers: [
        BookingsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
