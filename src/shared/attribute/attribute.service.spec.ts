import { TestBed, inject } from '@angular/core/testing';

import { AttributeService } from './attribute.service';

describe('AttributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeService]
    });
  });

  it('should be created', inject([AttributeService], (service: AttributeService) => {
    expect(service).toBeTruthy();
  }));
});
