import { TestBed, inject } from '@angular/core/testing';

import { AreaService } from './area.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { MockAreaService } from './mock-area.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../app-car/environments/environment';

describe('AreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: AreaService, useClass: MockAreaService}
      ]
    });
  });

  it('should be created', inject([AreaService], (service: AreaService) => {
    expect(service).toBeTruthy();
  }));
});
