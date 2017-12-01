import { TestBed, inject } from '@angular/core/testing';

import { CmsService } from './cms.service';
import { environment } from './../../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from './../../../shared/alert/mock-alert.service';
import { AlertService } from './../../../shared/alert/alert.service';

describe('CmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        CmsService,
        { provide: AlertService, useClass: MockAlertService },
      ]
    });
  });

  it('should be created', inject([CmsService], (service: CmsService) => {
    expect(service).toBeTruthy();
  }));
});
