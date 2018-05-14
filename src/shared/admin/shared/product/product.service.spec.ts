import { TestBed, inject } from '@angular/core/testing';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProductService } from './product.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { AlertService } from '../../../popup/alert.service';
import { environment } from '../../../../app-hockey/environments/environment';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        ProductService,
        {provide: AlertService, useClass: MockAlertService},
      ]
    });
  });

  it('should be created', inject([ ProductService ], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
