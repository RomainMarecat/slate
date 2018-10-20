import { TestBed, inject } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { VisitorService } from './visitor.service';
import { environment } from '../../app-hockey/environments/environment';

export function createFakeVisitor(afs: AngularFirestore, name: string) {
  return new VisitorService(afs, name);
}

export const TABLE_NAME = new InjectionToken<string>('test');

describe('VisitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {provide: TABLE_NAME, useValue: 'test'},
        {
          provide: VisitorService,
          useFactory: (createFakeVisitor),
          deps: [ AngularFirestore, TABLE_NAME ]
        },
      ]
    });
  });

  it('should be created', inject([ VisitorService ], (service: VisitorService) => {
    expect(service).toBeTruthy();
  }));
});
