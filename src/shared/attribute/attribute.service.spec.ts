import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MockAttributeService } from './mock-attribute.service';
import { environment } from '../../environments/environment.hockey';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AttributeService } from './attribute.service';

describe('AttributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: AttributeService, useClass: MockAttributeService }
      ]
    });
  });

  it('should be created', inject([AttributeService], (service: AttributeService) => {
    expect(service).toBeTruthy();
  }));
});
