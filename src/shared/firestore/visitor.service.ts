import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Document } from './document';
import {
  CollectionReference,
  Query,
  DocumentSnapshot,
  DocumentReference,
  WhereFilterOp,
  OrderByDirection
} from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction, Action, AngularFirestore } from '@angular/fire/firestore';
import { Filter } from './../facet/filter/shared/filter';
import { Sort } from './../facet/sort/shared/sort';
import { map, switchMap, timeout } from 'rxjs/internal/operators';
import { of } from 'rxjs/internal/observable/of';
import { combineLatest } from 'rxjs';

@Injectable()
export class VisitorService {
  collectionRef: AngularFirestoreCollection<DocumentReference>;
  documents$: Observable<DocumentChangeAction<any>[]>;
  document$: Observable<Document>;
  query$: BehaviorSubject<any | null>;
  filters$: BehaviorSubject<Filter[] | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | null>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;
  table: string;

  constructor(public afs: AngularFirestore, @Inject('TABLE_NAME') table: string) {
    this.table = table;
    this.query$ = new BehaviorSubject(null);
    this.filters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.orderBy$ = new BehaviorSubject(null);
    this.collectionRef = this.afs.collection(this.table);
    this.documents$ = combineLatest(
      this.filters$,
      this.limit$,
      this.orderBy$,
      this.query$
    ).pipe(
      switchMap(([filters, limit, orderBy, query]) => {
        return this.afs.collection(this.table, (ref) => {
          this.query = ref;
          if (query && this.query) {
            if (query.limit) {
              this.query = this.query.limit(query.limit);
            }
            if (query.filters) {
              query.filters.forEach((filter: Filter) => {
                this.query = this.query.where(filter.column, filter.operator as WhereFilterOp, filter.value);
              });
            }
            if (query.orderBy) {
              this.query = this.query.orderBy(query.orderBy.column, query.orderBy.direction as OrderByDirection);
            }
          }

          if (limit) {
            this.query = this.query.limit(limit);
          }
          if (filters && this.query) {
            filters.forEach((filter: Filter) => {
              this.query = this.query.where(filter.column, filter.operator as WhereFilterOp, filter.value);
            });
          }
          if (orderBy) {
            this.query = this.query.orderBy(orderBy.column, orderBy.direction as OrderByDirection);
          }

          return this.query;
        })
          .snapshotChanges();
      })
    );
  }

  /**
   * get multiple documents
   * @return Observable
   */
  getDocuments(): Observable<any[]> {
    return this.documents$.pipe(
      map((documents) => {
        return documents.map((document: DocumentChangeAction<any>) => {
          if (document.payload.doc.exists) {
            const doc = document.payload.doc.data() as Document;
            // Useful if doc id is missing on forgot update after create function
            // if (!doc.key) {
            //   doc.key = document.payload.doc.id;
            //   this.updateDocument(doc).then(() => {
            //   });
            // }
            doc.key = document.payload.doc.id;
            return doc;
          }
        });
      }));
  }

  private getDocPayload(path: string): Observable<any> {
    return this.document$ = this.collectionRef
      .doc(path)
      .snapshotChanges()
      .pipe(
        map((action: Action<DocumentSnapshot>) => {
          if (action.payload.exists) {
            const product = action.payload.data() as Document;
            product.key = action.payload.id;
            return product;
          }
          return null;
        }));
  }

  /**
   * get a single document
   */
  getDocument(key: null | string): Observable<Document> {
    if (key) {
      return this.getDocPayload(key);
    }
    return of(null);
  }

  /**
   * Update a document
   */
  updateDocument(document: Document): Promise<void> {
    return this.collectionRef.doc(document.key).update({...document});
  }

  /**
   * create a Document
   */
  createDocument(document: any): Promise<DocumentReference> {
    return this.collectionRef.add(document);
  }

  /**
   * Delete a document
   */
  deleteDocument(document: Document) {
    this.collectionRef.doc(document.key).delete();
  }
}
