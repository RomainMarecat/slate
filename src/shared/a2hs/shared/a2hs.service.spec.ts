import { TestBed } from '@angular/core/testing';

import { A2hsService } from './a2hs.service';

describe('A2hsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: A2hsService = TestBed.get(A2hsService);
    expect(service).toBeTruthy();
  });
});
