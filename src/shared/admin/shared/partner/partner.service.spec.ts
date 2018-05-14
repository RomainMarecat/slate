import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PartnerService } from './partner.service';
import { MockPartnerService } from './mock-partner.service';
import { environment } from '../../../../app-hockey/environments/environment';

describe('PartnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [ {provide: PartnerService, useClass: MockPartnerService} ],
    });
  });

  it('should be created', inject([ PartnerService ], (service: PartnerService) => {
    expect(service).toBeTruthy();
  }));
});
