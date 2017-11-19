import { TestBed, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { ProductService } from './product.service';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockAlertService } from './../alert/mock-alert.service';
import { AlertService } from './../alert/alert.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        ProductService,
        { provide: AlertService, useClass: MockAlertService },
      ]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});