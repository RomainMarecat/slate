import { TestBed, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { ClothingService } from './clothing.service';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from './../alert/mock-alert.service';
import { AlertService } from './../alert/alert.service';

describe('ClothingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        ClothingService,
        { provide: AlertService, useClass: MockAlertService },
      ]
    });
  });

  it('should be created', inject([ClothingService], (service: ClothingService) => {
    expect(service).toBeTruthy();
  }));
});
