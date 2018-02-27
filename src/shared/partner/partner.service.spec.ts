import { TestBed, inject } from '@angular/core/testing';

import { PartnerService } from './partner.service';
import {MockPartnerService} from './mock-partner.service';

describe('PartnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PartnerService, useClass: MockPartnerService
        }
      ]
    });
  });

  it('should be created', inject([PartnerService], (service: PartnerService) => {
    expect(service).toBeTruthy();
  }));
});
