import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserGuard } from './user.guard';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from '../popup/mock-alert.service';
import { AlertService } from '../popup/alert.service';
import { environment } from '../../app-hockey/environments/environment';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule
      ],
      providers: [
        UserGuard,
        { provide: AlertService, useClass: MockAlertService },

      ]
    });
  });

  it('should ...', inject([UserGuard], (guard: UserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
