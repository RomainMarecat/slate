import { TestBed, inject } from '@angular/core/testing';

import { Favicon } from './favicon.service';

describe('Favicon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Favicon]
    });
  });

  it('should be created', inject([Favicon], (service: Favicon) => {
    expect(service).toBeTruthy();
  }));
});
