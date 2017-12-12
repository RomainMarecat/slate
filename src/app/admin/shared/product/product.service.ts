import { Injectable } from '@angular/core';
import { ClothingProduct } from '../../../../core/shared/product/clothing-product';
import { AlertService } from '../../../../core/shared/alert/alert.service';
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
  productCollectionRef: AngularFirestoreCollection < ClothingProduct > ;
  products$: Observable < DocumentChangeAction[] > ;
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

  /**
   *
   * @param {AngularFirestore} afs
   * @param {AlertService} alertService
   */
  constructor(private afs: AngularFirestore, private alertService: AlertService) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.productCollectionRef = this.afs.collection('clothes');
    this.products$ = Observable.combineLatest(
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

  /**
   *
   * @returns {Observable<ClothingProduct[]>}
   */
  getProducts(): Observable < ClothingProduct[] > {
    return this.products$.map((products: DocumentChangeAction[]) =>
      products.map((doc: DocumentChangeAction) => {
        const product = doc.payload.doc.data() as ClothingProduct;
        product.key = doc.payload.doc.id;
        return product as ClothingProduct;
      })
    );
  }

  /**
   *
   * @param {string} key
   * @returns {Observable<ClothingProduct[]>}
   */
  getProduct(key: null | string): Observable < ClothingProduct[] > {
    this.keyFilters$.next(key);
    return this.getProducts().take(1);
  }

  /**
   *
   * @param {ClothingProduct} product
   */
  updateProduct(product: ClothingProduct) {
    this.productCollectionRef.doc(product.key).update({ ...product });
  }

  /**
   *
   * @param {ClothingProduct} product
   */
  createProduct(product: ClothingProduct) {
    delete product.key;
    this.productCollectionRef.add({ ...product });
  }

  /**
   *
   * @param {ClothingProduct} product
   */
  deleteProduct(product: ClothingProduct) {
    this.productCollectionRef.doc(product.key).delete();
  }
}
