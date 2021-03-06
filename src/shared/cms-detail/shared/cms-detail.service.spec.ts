import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';

import { CmsDetailService } from './cms-detail.service';
import { MockCmsDetailService } from './mock-cms-detail.service';
import { environment } from '../../../app-hockey/environments/environment';

describe('CmsDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      providers: [
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    });
  });

  it('should be created', inject([ CmsDetailService ], (service: CmsDetailService) => {
    expect(service).toBeTruthy();
  }));
});
