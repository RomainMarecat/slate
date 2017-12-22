import { TestBed, inject } from '@angular/core/testing';

import { SelectionService } from './selection.service';
import { environment } from './../../../environments/environment.monpullmoche';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockSelectionService } from './mock-selection.service';

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
        { provide: SelectionService, useClass: MockSelectionService }
      ]
    });
  });

  it('should be created', inject([SelectionService], (service: SelectionService) => {
    expect(service).toBeTruthy();
  }));
});
