import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { OfferService } from './offer.service';
import { MockOfferService } from './mock-offer.service';
import { environment } from '../../../../app-hockey/environments/environment';

describe('OfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [{ provide: OfferService, useClass: MockOfferService }],
    });
  });

  it('should be created', inject([OfferService], (service: OfferService) => {
    expect(service).toBeTruthy();
  }));
});
