import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ScoreService } from './score.service';
import { environment } from '../../../environments/environment.monpullmoche';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


describe('ScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [ScoreService]
    });
  });

  it('should be created', inject([ScoreService], (service: ScoreService) => {
    expect(service).toBeTruthy();
  }));
});
