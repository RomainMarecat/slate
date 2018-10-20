import { TestBed, inject } from '@angular/core/testing';

import { AreaService } from './area.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
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
