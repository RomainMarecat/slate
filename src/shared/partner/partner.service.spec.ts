import { TestBed, inject } from '@angular/core/testing';

import { PartnerService } from './partner.service';
import {MockPartnerService} from './mock-partner.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment.hockey';
import {AngularFirestoreModule} from 'angularfire2/firestore';

describe('PartnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: PartnerService, useClass: MockPartnerService },
      ]
    });
  });

  it('should be created', inject([PartnerService], (service: PartnerService) => {
    expect(service).toBeTruthy();
  }));
});
