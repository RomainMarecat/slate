import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Reference, Action } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import DocumentReference = firebase.firestore.DocumentReference;
import { Product } from '../product/product';
import { Document } from './document';
import DocumentData = firebase.firestore.DocumentData;

@Injectable()
export class VisitorService {
  collectionRef: AngularFirestoreCollection < DocumentReference > ;
  documents$: Observable < DocumentChangeAction[] > ;
  document$: Observable < Document > ;
  columnFilter$: BehaviorSubject < string | null > ;
  valueFilter$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: firebase.firestore.CollectionReference | firebase.firestore.Query;
  table: string;

  /**
   * @param AngularFirestore private          afs
   * @param string                            table
   */
  constructor(private afs: AngularFirestore, @Inject('table') table: string) {
    this.table = table;
    this.columnFilter$ = new BehaviorSubject(null);
    this.valueFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.orderBy$ = new BehaviorSubject(null);
    this.collectionRef = this.afs.collection('product');
    this.documents$ = Observable.combineLatest(
        this.columnFilter$,
        this.valueFilter$,
        this.limit$,
        this.orderBy$
      )
      .switchMap(([column, value, limit, orderBy]) => {
        return this.afs.collection(this.table, ref => {
            this.query = ref;
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
   * get multiple documents
   * @return Observable
   */
  getDocuments(): Observable < any[] > {
    return this.documents$.map((documents: DocumentChangeAction[]) => {
      return documents.map((document: DocumentChangeAction) => {
        const doc = document.payload.doc.data() as Document;
        doc.key = document.payload.doc.id;
        return doc;
      });
    });
  }

  /**
   * @param  string  path
   * @return Observable
   */
  private getDocPayload(path: string): Observable < any > {
    return this.document$ = this.collectionRef
      .doc(path)
      .snapshotChanges()
      .map((action: Action < firebase.firestore.DocumentSnapshot > ) => {
        const product = action.payload.data() as Document;
        product.key = action.payload.id;
        return product;
      });
  }

  /**
   * get a single document
   * @param string key
   * @returns Observable<Document>
   */
  getDocument(key: null | string): Observable < Document > {
    if (key) {
      return this.getDocPayload(key);
    }
    return Observable.of(null);
  }

  /**
   * Update a document
   * @param Document document
   */
  updateDocument(document: Document): Promise < void > {
    return this.collectionRef.doc(document.key).update({ ...document });
  }

  /**
   * create a Document
   * @param Document document
   */
  createDocument(document: any): Promise < DocumentReference > {
    return this.collectionRef.add({ ...document });
  }

  /**
   * Delete a document
   * @param Document Document
   */
  deleteDocument(document: Document) {
    this.collectionRef.doc(document.key).delete();
  }
}
