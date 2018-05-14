import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from '../popup/mock-alert.service';
import { AlertService } from '../popup/alert.service';

import { CategoryService } from './category.service';
import { MockCategoryService } from './mock-category.service';
import { environment } from '../../app-hockey/environments/environment';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    });
  });

  it('should be created', inject([ CategoryService ], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
