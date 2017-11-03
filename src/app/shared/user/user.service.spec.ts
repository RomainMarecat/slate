import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { AlertService } from './../alert/alert.service';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from './../alert/mock-alert.service';
import { MockUserService } from './mock-user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: AlertService, useClass: MockAlertService },
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
