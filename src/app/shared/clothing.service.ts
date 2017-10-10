import { Injectable } from '@angular/core';
import { Clothing } from './clothing';
import { IClothing } from './i-clothing';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';

@Injectable()
export class ClothingService {
  clothingCollectionRef: AngularFirestoreCollection<IClothing>;
  clothes$: Observable<IClothing[]>;

  constructor(private afs: AngularFirestore) {
    this.clothingCollectionRef = this.afs.collection<IClothing>('pull');
    this.clothes$ = this.clothingCollectionRef.snapshotChanges()
      .map((clothes: DocumentChangeAction[]) => {
        return clothes.map((doc: DocumentChangeAction) => {
          console.log(doc)
          const clothing = doc.payload.doc.data() as IClothing;
          clothing.key = doc.payload.doc.id;
          return new Clothing(clothing);
        });
      });
  }

  getClothes(): Observable<IClothing[]> {
    return this.clothes$;
  }

  updateClothing(clothing: IClothing): Promise<void> {
    return this.clothingCollectionRef.doc(clothing.key).update({...clothing});
  }

  createClothing(clothing: IClothing) {
    console.log('clothing added: ', clothing);
    delete clothing.key;
    this.clothingCollectionRef.add({...clothing});
  }

  deleteClothing(clothing: IClothing): Promise<void> {
    return this.clothingCollectionRef.doc(clothing.key).delete();
  }
}
