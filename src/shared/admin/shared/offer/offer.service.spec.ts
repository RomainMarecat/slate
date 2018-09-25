import { TestBed, inject } from '@angular/core/testing';
import { OfferService } from './offer.service';
import { MockOfferService } from './mock-offer.service';
import { environment } from '../../../../app-hockey/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('OfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [{provide: OfferService, useClass: MockOfferService}],
    });
  });

  it('should be created', inject([OfferService], (service: OfferService) => {
    expect(service).toBeTruthy();
  }));
});
