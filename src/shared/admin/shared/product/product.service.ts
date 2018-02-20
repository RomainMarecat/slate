import { Injectable } from '@angular/core';
import { ClothingProduct } from '../../../product/clothing-product';
import { HockeyProduct } from '../../../product/hockey-product';
import { Product } from '../../../product/product';
import { AlertService } from '../../../popup/alert.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot, DocumentReference } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';

@Injectable()
export class ProductService {
  productCollectionRef: AngularFirestoreCollection < Product > ;
  products$: Observable < DocumentChangeAction[] > ;
  product$: Observable < Product > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject < string | null > ;
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
   * @param {AngularFirestore} afs
   * @param {AlertService} alertService
   */
  constructor(private afs: AngularFirestore, private alertService: AlertService) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.productCollectionRef = this.afs.collection('product');
    this.products$ = Observable.combineLatest(
        this.keyFilters$,
        this.publishedFilter$,
        this.nameFilters$,
        this.userFilter$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, published, name, user, limit]) =>
        this.afs.collection('product', ref => {
          this.query = ref;
          if (published) {
            this.query = this.query.where('published', '==', published);
          }
          if (name) {
            this.query = this.query.where('name', '==', name);
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
   * @returns {Observable<Product[]>}
   */
  getProducts(): Observable < Product[] > {
    return this.products$.map((products: DocumentChangeAction[]) =>
      products
      .filter((doc: DocumentChangeAction) => {
        return doc.payload.doc.exists === true;
      })
      .map((doc: DocumentChangeAction) => {
        const product = doc.payload.doc.data() as Product;
        product.key = doc.payload.doc.id;
        return product as Product;
      })
    );
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
  updateProduct(product: Product): Promise < void > {
    return this.productCollectionRef.doc(product.key).update({ ...product });
  }

  /**
   * createProduct
   * @param HockeyProduct | Product product
   */
  createProduct(product: HockeyProduct | ClothingProduct): Promise < DocumentReference > {
    return this.productCollectionRef.add({ ...product });
  }

  /**
   *
   * @param {Product} product
   */
  deleteProduct(product: Product) {
    this.productCollectionRef.doc(product.key).delete();
  }
}
