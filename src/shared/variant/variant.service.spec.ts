import { TestBed, inject } from '@angular/core/testing';

import { VariantService } from './variant.service';

describe('VariantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariantService]
    });
  });

  it('should be created', inject([VariantService], (service: VariantService) => {
    expect(service).toBeTruthy();
  }));
});
