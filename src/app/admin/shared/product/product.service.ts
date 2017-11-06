import { Injectable } from '@angular/core';
import { IClothing } from './../../../shared/clothing/i-clothing';
import { AlertService } from './../../../shared/alert/alert.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {
  clothingCollectionRef: AngularFirestoreCollection < IClothing > ;
  clothes$: Observable < DocumentChangeAction[] > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject < string | null > ;
  colorFilter$: BehaviorSubject < string | null > ;
  userFilter$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: firebase.firestore.CollectionReference | firebase.firestore.Query;

  constructor(private afs: AngularFirestore, private alertService: AlertService) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.clothingCollectionRef = this.afs.collection('clothes');
    this.clothes$ = Observable.combineLatest(
        this.keyFilters$,
        this.publishedFilter$,
        this.nameFilters$,
        this.colorFilter$,
        this.userFilter$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, published, name, color, user, limit]) =>
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
          if (limit) {
            this.query = this.query.limit(limit);
          }
          return this.query;
        })
        .snapshotChanges()
      );
  }

  getClothes(): Observable < IClothing[] > {
    return this.clothes$.map((clothes: DocumentChangeAction[]) =>
      clothes.map((doc: DocumentChangeAction) => {
        const clothing = doc.payload.doc.data() as IClothing;
        clothing.key = doc.payload.doc.id;
        return clothing as IClothing;
      })
    );
  }

  getClothing(key: null | string): Observable < IClothing[] > {
    this.keyFilters$.next(key);
    return this.getClothes().take(1);
  }

  updateClothing(clothing: IClothing) {
    this.clothingCollectionRef.doc(clothing.key).update({ ...clothing });
  }

  createClothing(clothing: IClothing) {
    delete clothing.key;
    this.clothingCollectionRef.add({ ...clothing });
  }

  deleteClothing(clothing: IClothing) {
    this.clothingCollectionRef.doc(clothing.key).delete();
  }
}
