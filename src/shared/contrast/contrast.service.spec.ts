import { TestBed } from '@angular/core/testing';

import { ContrastService } from './contrast.service';

describe('ContrastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContrastService = TestBed.get(ContrastService);
    expect(service).toBeTruthy();
  });
});
