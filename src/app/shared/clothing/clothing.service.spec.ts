import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ClothingService } from './clothing.service';
import { environment } from './../../../environments/environment';

describe('ClothingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
      ],
      providers: [ClothingService]
    });
  });

  it('should be created', inject([ClothingService], (service: ClothingService) => {
    expect(service).toBeTruthy();
  }));
});
