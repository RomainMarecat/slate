import { TestBed, inject } from '@angular/core/testing';

import { ObjectService } from './object.service';

describe('ObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectService]
    });
  });

  it('should be created', inject([ObjectService], (service: ObjectService) => {
    expect(service).toBeTruthy();
  }));
});
