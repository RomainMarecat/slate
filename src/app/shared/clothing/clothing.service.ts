import { Injectable } from '@angular/core';
import { Clothing } from './clothing';
import { IClothing } from './i-clothing';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class ClothingService {
  clothingCollectionRef: AngularFirestoreCollection < IClothing > ;
  clothes$: Observable < IClothing[] | {} > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject <string | null >;
  colorFilter$: BehaviorSubject < string | null > ;
  userFilter$: BehaviorSubject < string | null > ;
  imit$: BehaviorSubject < number | 20 > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: firebase.firestore.CollectionReference | firebase.firestore.Query;

  constructor(private afs: AngularFirestore) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(true);
    this.nameFilters$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);

    this.clothes$ = Observable.combineLatest(
      this.keyFilters$,
      this.publishedFilter$,
      this.nameFilters$,
      this.colorFilter$,
      this.userFilter$
    ).switchMap(([key, published, name, color, user]) =>
      this.afs.collection('clothes', ref => {
        this.query = ref;
        if (published) {
          this.query = this.query.where('published', '==', published);
        }
        if (name) {
          this.query = this.query.where('name', '==', name);
        }
        if (color) {
          this.query = this.query.where('color', '==', color);
        }
        if (user) {
          this.query = this.query.where('user', '==', user);
        }
        return this.query;
      })
      .snapshotChanges()
    );;
  }

  getClothes(): Observable < IClothing[] | {} > {
    return this.clothes$.map((clothes: DocumentChangeAction[]) =>
      clothes.map((doc: DocumentChangeAction) => {
        console.log(doc);
        const clothing = doc.payload.doc.data() as IClothing;
        clothing.key = doc.payload.doc.id;
        return clothing as IClothing;
      })
    );
  }

  getClothing(key: string) {
    return this.clothingCollectionRef.valueChanges();
  }

  updateClothing(clothing: IClothing): Promise < void > {
    return this.clothingCollectionRef.doc(clothing.key).update({ ...clothing });
  }

  createClothing(clothing: IClothing) {
    delete clothing.key;
    this.clothingCollectionRef.add({ ...clothing });
  }

  deleteClothing(clothing: IClothing): Promise < void > {
    return this.clothingCollectionRef.doc(clothing.key).delete();
  }
}
