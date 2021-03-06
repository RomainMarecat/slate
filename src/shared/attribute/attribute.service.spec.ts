import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MockAttributeService } from './mock-attribute.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

import { AttributeService } from './attribute.service';
import { environment } from '../../app-hockey/environments/environment';

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
