import { TestBed, inject } from '@angular/core/testing';

import { MapService } from './map.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MockMapService } from './mock-map.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../app-car/environments/environment';

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
