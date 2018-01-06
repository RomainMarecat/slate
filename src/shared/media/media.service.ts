import { Injectable, Inject } from '@angular/core';
import { Media } from './media';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { DocumentChangeAction, Reference, Action } from 'angularfire2/firestore/interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';

import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class MediaService {
  mediaCollectionRef: AngularFirestoreCollection < Media > ;
  medias$: Observable < DocumentChangeAction[] > ;
  media$: Observable < Media > ;
  publicIdFilter$: BehaviorSubject < string | null > ;
  urlFilter$: BehaviorSubject < string | null > ;
  limitFilter$: BehaviorSubject < number | null > ;

  /**
   * @param AngularFirestore afs
   */
  constructor(private afs: AngularFirestore) {
    this.mediaCollectionRef = this.afs.collection < Media > ('media');
    this.publicIdFilter$ = new BehaviorSubject(null);
    this.urlFilter$ = new BehaviorSubject(null);
    this.limitFilter$ = new BehaviorSubject(5);
    this.medias$ = Observable.combineLatest(
        this.publicIdFilter$,
        this.urlFilter$,
        this.limitFilter$
      )
      .first()
      .switchMap(([publicId, url, limit]) =>
        this.afs.collection('media', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (publicId) {
            query = query.where('public_id', '==', publicId);
          }
          if (url) {
            query = query.where('url', '==', url);
          }
          if (limit) {
            query = query.limit(limit);
          }
          return query;
        }).snapshotChanges()
      );
  }

  /**
   *
   * @param {string} publicId
   * @returns {Observable<Media[]>}
   */
  filterByPublicId(publicId: string | null): Observable < Media[] > {
    this.publicIdFilter$.next(publicId);
    return this.getMedias();
  }

  /**
   *
   * @param string url
   */
  filterByUrl(url: string | null) {
    this.urlFilter$.next(url);
  }

  /**
   *
   * @returns Observable<Media[]>
   */
  getMedias(): Observable < Media[] > {
    return this.medias$.map((products: DocumentChangeAction[]) =>
      products.map((doc: DocumentChangeAction) => {
        const media = doc.payload.doc.data() as Media;
        media.key = doc.payload.doc.id;
        return media as Media;
      })
    );
  }

  getDocumentMedia(path: string): Observable < Media > {
    return this.media$ = this.mediaCollectionRef
      .doc(path)
      .snapshotChanges()
      .map((action: Action < firebase.firestore.DocumentSnapshot > ) => {
        const media = action.payload.data() as Media;
        media.key = action.payload.id;
        return media;
      });
  }

  /**
   *
   * @param string key
   * @returns Observable<Media>
   */
  getMedia(key: null | string): Observable < Media > {
    if (key) {
      return this.getDocumentMedia(key);
    }
    return Observable.of(null);
  }

  /**
   *
   * @param Media media
   */
  addMedia(media: Media): Promise < DocumentReference > {
    return this.mediaCollectionRef.add({ ...media });
  }
}
