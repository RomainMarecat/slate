import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import { MockOrderService } from './mock-order.service';

describe('OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: OrderService, useClass: MockOrderService}
      ]
    });
  });

  it('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
