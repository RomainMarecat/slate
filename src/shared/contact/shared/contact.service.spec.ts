import { TestBed, inject } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { MockContactService } from './mock-contact.service';

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: ContactService, useClass: MockContactService} ]
    });
  });

  it('should be created', inject([ ContactService ], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
