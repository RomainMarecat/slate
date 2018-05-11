import { TestBed, inject } from '@angular/core/testing';

import { EventService } from './event.service';
import { MockEventService } from './mock-event.service';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: EventService, useClass: MockEventService} ]
    });
  });

  it('should be created', inject([ EventService ], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});
