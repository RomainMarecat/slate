import { TestBed, inject } from '@angular/core/testing';
import { environment } from './../../../../environments/environment.monpullmoche';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from '../../../../core/shared/alert/mock-alert.service';
import { AlertService } from '../../../../core/shared/alert/alert.service';

import { CmsDetailService } from './cms-detail.service';

describe('CmsDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        CmsDetailService,
        { provide: AlertService, useClass: MockAlertService },
      ]
    });
  });

  it('should be created', inject([CmsDetailService], (service: CmsDetailService) => {
    expect(service).toBeTruthy();
  }));
});
