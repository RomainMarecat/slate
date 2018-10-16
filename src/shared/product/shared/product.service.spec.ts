import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { MockProductService } from './mock-product.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { environment } from '../../../app-hockey/environments/environment';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    });
  });

  it('should be created', inject([ ProductService ], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});