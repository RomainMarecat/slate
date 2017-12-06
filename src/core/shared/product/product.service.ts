import { Injectable } from '@angular/core';
import { Product } from './product';
import { IProduct } from './i-product';
import { AlertService } from '../alert/alert.service';
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
  productCollectionRef: AngularFirestoreCollection < IProduct > ;
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
    this.publishedFilter$ = new BehaviorSubject(true);
    this.nameFilters$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('published_at');
    this.productCollectionRef = this.afs.collection('clothes');
    this.products$ = Observable.combineLatest(
        this.keyFilters$,
        this.publishedFilter$,
        this.nameFilters$,
        this.colorFilter$,
        this.userFilter$,
        this.limit$,
        this.orderBy$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, published, name, color, user, limit, orderBy]: any) =>
        this.afs.collection('clothes', ref => {
          this.query = ref;
          if (key) {
            this.query = this.query.where('key', '==', key);
          }
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
          if (orderBy) {
            this.query = this.query.orderBy(orderBy, 'desc');
          }
          return this.query;
        })
        .snapshotChanges()
      );
  }

  /**
   *
   * @returns {Observable<IProduct[]>}
   */
  getProducts(): Observable < IProduct[] > {
    return this.products$.map((products: DocumentChangeAction[]) =>
      products.map((doc: DocumentChangeAction) => {
        const product = doc.payload.doc.data() as IProduct;
        product.key = doc.payload.doc.id;
        return product as IProduct;
      })
    );
  }

  /**
   *
   * @param {string} key
   * @returns {Observable<IProduct[]>}
   */
  getProduct(key: null | string): Observable < IProduct[] > {
    this.keyFilters$.next(key);
    return this.getProducts().take(1);
  }

  /**
   *
   * @param {IProduct} product
   */
  updateProduct(product: IProduct) {
    this.productCollectionRef.doc(product.key).update({ ...product });
  }

  /**
   *
   * @param {IProduct} product
   */
  createProduct(product: IProduct) {
    delete product.key;
    this.productCollectionRef.add({ ...product });
  }

  /**
   *
   * @param {IProduct} product
   */
  deleteProduct(product: IProduct) {
    this.productCollectionRef.doc(product.key).delete();
  }
}
