import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MockCartService } from './mock-cart.service';

describe('CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CartService, useClass: MockCartService}
      ]
    });
  });

  it('should be created', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
});
