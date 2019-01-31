import { inject, TestBed } from '@angular/core/testing';

import { SelectionService } from './selection.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MockSelectionService } from './mock-selection.service';
import { environment } from '../../app-hockey/environments/environment';

describe('SelectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
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
