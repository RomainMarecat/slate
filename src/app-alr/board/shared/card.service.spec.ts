import { TestBed, inject } from '@angular/core/testing';

import { CardService } from './card.service';
import { MockCardService } from './mock-card.service';

describe('CardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CardService, useClass: MockCardService}
      ]
    });
  });

  it('should be created', inject([CardService], (service: CardService) => {
    expect(service).toBeTruthy();
  }));
});
