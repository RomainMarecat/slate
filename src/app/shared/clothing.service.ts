import { Injectable } from '@angular/core';
import { Clothing } from './clothing';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClothingService {
  clothingCollectionRef: AngularFirestoreCollection<Clothing>;
  clothing$: Observable<Clothing[]>;

  constructor(private afs: AngularFirestore) {
    this.clothingCollectionRef = this.afs.collection<Clothing>('pull');
    this.clothing$ = this.clothingCollectionRef.valueChanges();
  }

  getClothes(): Observable<Clothing[]> {
    return this.clothing$;
  }
}
