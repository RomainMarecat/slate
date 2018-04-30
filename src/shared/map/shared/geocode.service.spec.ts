import { TestBed, inject } from '@angular/core/testing';

import { GeocodeService } from './geocode.service';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment.car';

describe('GeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapApiKey
        }),
      ],
      providers: [GeocodeService]
    });
  });

  it('should be created', inject([GeocodeService], (service: GeocodeService) => {
    expect(service).toBeTruthy();
  }));
});
