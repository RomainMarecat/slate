import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { AlertService } from '../popup/alert.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from '../popup/mock-alert.service';
import { MockUserService } from './mock-user.service';
import { environment } from '../../app-hockey/environments/environment';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    });
  });

  it('should be created', inject([ UserService ], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
