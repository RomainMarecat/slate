import { Inject, Injectable } from '@angular/core';
import { Media } from './media';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
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

  filterByPublicId(publicId: string | null) {
    this.filters$.next([{
      value: publicId,
      column: 'public_id',
      operator: '=='
    }]);
  }

  filterByUrl(url: string | null) {
    this.filters$.next([{
      value: url,
      column: 'url',
      operator: '=='
    }]);
  }
}
