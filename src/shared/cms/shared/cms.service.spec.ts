import { TestBed, inject } from '@angular/core/testing';

import { CmsService } from './cms.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { MockCmsService } from './mock-cms.service';
import { environment } from '../../../app-hockey/environments/environment';

describe('CmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: CmsService, useClass: MockCmsService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    });
  });

  it('should be created', inject([ CmsService ], (service: CmsService) => {
    expect(service).toBeTruthy();
  }));
});
