import { Inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';

@Injectable()
export class ProductService {
  productCollectionRef: AngularFirestoreCollection < Product > ;
  products$: Observable < DocumentChangeAction[] > ;
  product$: Observable < Product > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilter$: BehaviorSubject < string | null > ;
  keyFilter$: BehaviorSubject < string | null > ;
  colorFilter$: BehaviorSubject < string | null > ;
  userFilter$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: CollectionReference | Query;

  /**
   *
   * @param AngularFirestore afs
   * @param AlertService alertService
   */
  constructor(private afs: AngularFirestore,
    @Inject('app_name') appName: string) {
    this.keyFilter$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilter$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.orderBy$ = new BehaviorSubject(null);
    this.productCollectionRef = this.afs.collection('product');
    this.products$ = Observable.combineLatest(
        this.publishedFilter$,
        this.nameFilter$,
        this.colorFilter$,
        this.userFilter$,
        this.limit$,
        this.orderBy$
      )
      .switchMap(([published, name, color, user, limit, orderBy]) => {
        return this.afs.collection('product', ref => {
            this.query = ref;

            if (published === false || published !== null) {
              this.query = this.query.where('published', '==', published);
            } else {
              this.query = this.query.where('published', '==', true);
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
          .snapshotChanges();
      });
  }

  /**
   *
   * @returns {Observable<Product[]>}
   */
  getProducts(): Observable < Product[] > {
    return this.products$.map((products: DocumentChangeAction[]) => {
      console.log('products', products);
      return products.map((doc: DocumentChangeAction) => {
        const product = doc.payload.doc.data() as Product;
        product.key = doc.payload.doc.id;
        return product as Product;
      });
    });
  }

  getDocumentProduct(path: string): Observable < Product > {
    return this.product$ = this.productCollectionRef
      .doc(path)
      .snapshotChanges()
      .map((action: Action < DocumentSnapshot > ) => {
        const product = action.payload.data() as Product;
        product.key = action.payload.id;
        return product;
      });
  }

  /**
   *
   * @param string key
   * @returns Observable<Product>
   */
  getProduct(key: null | string): Observable < Product > {
    if (key) {
      return this.getDocumentProduct(key);
    }
    return Observable.of(null);
  }

  /**
   *
   * @param {Product} product
   */
  updateProduct(product: Product) {
    this.productCollectionRef.doc(product.key).update({ ...product });
  }

  /**
   *
   * @param {Product} product
   */
  createProduct(product: Product) {
    delete product.key;
    this.productCollectionRef.add({ ...product });
  }

  /**
   *
   * @param {Product} product
   */
  deleteProduct(product: Product) {
    this.productCollectionRef.doc(product.key).delete();
  }
}
