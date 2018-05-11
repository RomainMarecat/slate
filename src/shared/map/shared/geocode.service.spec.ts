import { TestBed, inject } from '@angular/core/testing';

import { GeocodeService } from './geocode.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { environment } from '../../../environments/environment.car';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockMapsAPILoader } from './mock-maps-api-loader';

describe('GeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapApiKey
        }),
        HttpClientTestingModule
      ],
      providers: [
        GeocodeService,
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
      ]
    });
  });

  it('should be created', inject([GeocodeService], (service: GeocodeService) => {
    expect(service).toBeTruthy();
  }));
});
