import { TestBed, inject } from '@angular/core/testing';

import { ClothingService } from './clothing.service';

describe('ClothingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClothingService]
    });
  });

  it('should be created', inject([ClothingService], (service: ClothingService) => {
    expect(service).toBeTruthy();
  }));
});
