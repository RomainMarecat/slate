import { Injectable } from '@angular/core';
import { Media } from './media';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Cloudinary } from '../cloudinary/cloudinary.service';
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
   *
   * @param {AngularFirestore} afs
   */
  constructor(private afs: AngularFirestore, private cloudinary: Cloudinary) {
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
   * Get tags from public id of cloudinary
   * @return {any}
   */
  getPictureTags(publicId) {
    const imageTag = this.cloudinary.imageTag(publicId);
    return this.getElementAttributes(imageTag.attributes());
  }

  getPictureSrc(publicId): string {
    const tags = this.getPictureTags(publicId);
    return tags.src as string;
  }

  getElementAttributes(attributesLiteral: string[]) {
    const attr = {src: ''};

    Object.keys(attributesLiteral).forEach(attrName => {
      attr[attrName] = attributesLiteral[attrName];
    });

    return attr;
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
