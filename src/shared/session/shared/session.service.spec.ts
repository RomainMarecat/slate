import { TestBed, inject } from '@angular/core/testing';

import { SessionService } from './session.service';
import { MockSessionService } from './mock-session.service';

describe('SessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: SessionService, useClass: MockSessionService}
      ]
    });
  });

  it('should be created', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
