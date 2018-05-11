import { TestBed, inject } from '@angular/core/testing';

import { BookingService } from './booking.service';
import { MockBookingService } from './mock-booking.service';

describe('BookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BookingService, useClass: MockBookingService}
      ]
    });
  });

  it('should be created', inject([ BookingService ], (service: BookingService) => {
    expect(service).toBeTruthy();
  }));
});
