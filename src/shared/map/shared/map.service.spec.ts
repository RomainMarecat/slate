import { TestBed, inject } from '@angular/core/testing';

import { MapService } from './map.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment.menincar';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockMapService } from './mock-map.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: MapService, useClass: MockMapService}
      ]
    });
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));
});
