import { TestBed, inject } from '@angular/core/testing';

import { SelectionService } from './selection.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule } from '@angular/common/http';
import { MockSelectionService } from './mock-selection.service';
import { environment } from '../../../../../app-hockey/environments/environment';

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
        {provide: SelectionService, useClass: MockSelectionService}
      ]
    });
  });

  it('should be created', inject([ SelectionService ], (service: SelectionService) => {
    expect(service).toBeTruthy();
  }));
});
