import { Inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot, OrderByDirection, WhereFilterOp } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Sort } from '../facet/sort/shared/sort';
import { Filter } from '../facet/filter/shared/filter';
import { VisitorService } from '../firestore/visitor.service';

@Injectable()
export class ProductService extends VisitorService {
  productCollectionRef: AngularFirestoreCollection<Product>;
  products$: Observable<DocumentChangeAction<Product[]>>;
  product$: Observable<Product>;
  publishedFilter$: BehaviorSubject<boolean | true>;
  keyFilter$: BehaviorSubject<string | null>;
  filters$: BehaviorSubject<Filter[] | null>;
  userFilter$: BehaviorSubject<string | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | null>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  /**
   *
   * @param afs
   * @param table
   */
  constructor(afs: AngularFirestore,
              @Inject('TABLE_PRODUCT') table: string) {
    super(afs, table);
    this.startAt$ = new BehaviorSubject(null);
    this.startAfter$ = new BehaviorSubject(null);
    this.keyFilter$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.filters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.orderBy$ = new BehaviorSubject(null);
    this.productCollectionRef = this.afs.collection(table);
    this.products$ = Observable.combineLatest(
      this.publishedFilter$,
      this.userFilter$,
      this.filters$,
      this.limit$,
      this.orderBy$
    )
      .switchMap(([ published, user, filters, limit, orderBy ]) => {
        return this.afs.collection(table, ref => {
          this.query = ref;

          if (published === false || published !== null) {
            this.query = this.query.where('published', '==', published);
          } else {
            this.query = this.query.where('published', '==', true);
          }
          if (user) {
            this.query = this.query.where('user', '==', user);
          }
          if (filters) {
            filters.forEach((filter: Filter) => {
              this.query = this.query.where(filter.column, filter.operator as WhereFilterOp, filter.value);
            });
          }
          if (limit) {
            this.query = this.query.limit(limit);
          }
          if (orderBy) {
            this.query = this.query.orderBy(orderBy.column, orderBy.direction as OrderByDirection);
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
  getProducts(): Observable<Product[]> {
    return this.products$.map((products: DocumentChangeAction<Product[]>[]) => {
      return products.map((doc: DocumentChangeAction<Product>) => {
        const product = doc.payload.doc.data() as Product;
        product.key = doc.payload.doc.id;
        return product as Product;
      });
    });
  }

  getDocumentProduct(path: string): Observable<Product> {
    return this.product$ = this.productCollectionRef
      .doc(path)
      .snapshotChanges()
      .map((action: Action<DocumentSnapshot>) => {
        const product = action.payload.data() as Product;
        product.key = action.payload.id;
        return product;
      });
  }

  /**
   *
   * @returns Observable<Product>
   * @param key
   */
  getProduct(key: null | string): Observable<Product> {
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
    this.productCollectionRef.doc(product.key).update({...product});
  }

  /**
   *
   * @param {Product} product
   */
  createProduct(product: Product) {
    delete product.key;
    this.productCollectionRef.add({...product});
  }

  /**
   *
   * @param {Product} product
   */
  deleteProduct(product: Product) {
    this.productCollectionRef.doc(product.key).delete();
  }
}
