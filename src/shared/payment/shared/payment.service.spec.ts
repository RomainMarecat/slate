import { TestBed, inject } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { MockPaymentService } from './mock-payment.service';

describe('PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [

        {provide: PaymentService, useClass: MockPaymentService}
      ]
    });
  });

  it('should be created', inject([ PaymentService ], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});

