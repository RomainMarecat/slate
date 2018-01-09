import { Injectable } from '@angular/core';
import { Category } from './category';
import { AlertService } from '../../../../popup/alert.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot, DocumentReference } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  categoryCollectionRef: AngularFirestoreCollection < Category > ;
  categories$: Observable < DocumentChangeAction[] > ;
  category$: Observable < Category > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject < string | null > ;
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
  constructor(private afs: AngularFirestore,
    private alertService: AlertService) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.categoryCollectionRef = this.afs.collection('category');
    this.categories$ = Observable.combineLatest(
        this.keyFilters$,
        this.publishedFilter$,
        this.nameFilters$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, published, name, limit]) =>
        this.afs.collection('category', ref => {
          this.query = ref;
          if (published) {
            this.query = this.query.where('published', '==', published);
          }
          if (name) {
            this.query = this.query.where('name', '==', name);
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
   * @returns {Observable<Category[]>}
   */
  getCategories(): Observable < Category[] > {
    return this.categories$.map((categories: DocumentChangeAction[]) =>
      categories.map((doc: DocumentChangeAction) => {
        const category = doc.payload.doc.data() as Category;
        category.key = doc.payload.doc.id;
        return category as Category;
      })
    );
  }

  getDocumentCategory(path: string): Observable < Category > {
    return this.category$ = this.categoryCollectionRef
      .doc(path)
      .snapshotChanges()
      .map((action: Action < DocumentSnapshot > ) => {
        const category = action.payload.data() as Category;
        category.key = action.payload.id;
        return category;
      });
  }

  /**
   *
   * @param string key
   * @returns Observable<Category>
   */
  getCategory(key: null | string): Observable < Category > {
    if (key) {
      return this.getDocumentCategory(key);
    }
    return Observable.of(null);
  }

  /**
   *
   * @param {Category} category
   */
  updateCategory(category: Category) {
    this.categoryCollectionRef.doc(category.key).update({ ...category });
  }

  /**
   *
   * @param {Category} category
   */
  createCategory(category: Category) {
    delete category.key;
    this.categoryCollectionRef.add({ ...category });
  }

  /**
   *
   * @param {Category} category
   */
  deleteCategory(category: Category) {
    this.categoryCollectionRef.doc(category.key).delete();
  }
}
