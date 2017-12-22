import { TestBed, inject } from '@angular/core/testing';

import { SelectionService } from './selection.service';
import {mockSelection} from './mock-selection';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../../../../environments/environment.monpullmoche';
import {HttpClientModule} from '@angular/common/http';

describe('SelectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: SelectionService, useClass: mockSelection}]
    });
  });

  it('should be created', inject([SelectionService], (service: SelectionService) => {
    expect(service).toBeTruthy();
  }));
});
