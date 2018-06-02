import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ScoreService } from './score.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../app-hockey/environments/environment';
import { MockScoreService } from './mock-score.service';

describe('ScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: ScoreService, useClass: MockScoreService}
      ]
    });
  });

  it('should be created', inject([ScoreService], (service: ScoreService) => {
    expect(service).toBeTruthy();
  }));
});
