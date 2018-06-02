import { Inject, Injectable } from '@angular/core';
import { Media } from './media';
import { Observable } from 'rxjs/Observable';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot, DocumentReference } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import { VisitorService } from '../firestore/visitor.service';

@Injectable()
export class MediaService extends VisitorService {
  constructor(afs: AngularFirestore, @Inject('TABLE_MEDIA') table: string) {
    super(afs, table);
  }

  getMedias(): Observable<Media[]> {
    return super.getDocuments() as Observable<Media[]>;
  }

  getMedia(key: string): Observable<Media> {
    return super.getDocument(key) as Observable<Media>;
  }

  createMedia(media: Media): Promise<any> {
    return super.createDocument(media);
  }

  updateMedia(media: Media) {
    return super.updateDocument(media);
  }

  deleteMedia(media: Media) {
    return super.deleteDocument(media);
  }

  /**
   *
   * @param {string} publicId
   * @returns {Observable<Media[]>}
   */
  filterByPublicId(publicId: string | null): Observable<Media[]> {
    this.filters$.next([ {
      value: publicId,
      column: 'public_id',
      operator: '=='
    } ]);
    return this.getMedias();
  }

  /**
   *
   * @param url
   */
  filterByUrl(url: string | null) {
    this.filters$.next([ {
      value: url,
      column: 'url',
      operator: '=='
    } ]);
  }
}
