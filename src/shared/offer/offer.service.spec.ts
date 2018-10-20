import { TestBed, inject } from '@angular/core/testing';

import { OfferService } from './offer.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { MockOfferService } from './mock-offer.service';
import { environment } from '../../app-hockey/environments/environment';

describe('OfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        {provide: OfferService, useClass: MockOfferService},
      ]
    });
  });

  it('should be created', inject([ OfferService ], (service: OfferService) => {
    expect(service).toBeTruthy();
  }));
});
