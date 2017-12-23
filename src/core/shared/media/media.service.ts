import { Injectable, Inject } from '@angular/core';
import { Media } from './media';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';

@Injectable()
export class MediaService {
  mediaCollectionRef: AngularFirestoreCollection < Media > ;
  medias$: Observable < DocumentChangeAction[] > ;
  publicIdFilter$: BehaviorSubject < string | null > ;
  urlFilter$: BehaviorSubject < string | null > ;
  limitFilter$: BehaviorSubject < number | null > ;

  /**
   * constructor
   * @param AngularFirestore private afs
   * @param Cloudinary       private cloudinary
   * @param [type]
   */
  constructor(private afs: AngularFirestore,
    @Inject('APP_NAME') app_name: string) {
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
   * @param {string} url
   */
  filterByUrl(url: string | null) {
    this.urlFilter$.next(url);
  }

  /**
   *
   * @returns {Observable<Media[]>}
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

  /**
   *
   * @param {Media} media
   */
  addMedia(media: Media) {
    this.mediaCollectionRef.add({ ...media });
  }
}