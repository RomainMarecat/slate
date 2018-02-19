import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import { VisitorService } from './../firestore/visitor.service';
import { Comment } from './comment';

@Injectable()
export class CommentService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_COMMENT') table: string) {
    super(afs, table);
  }

  getComments(): Observable < Comment[] > {
    return <Observable < Comment[] >> super.getDocuments();
  }

  getComment(key: string): Observable < Comment > {
    return <Observable < Comment >> super.getDocument(key);
  }

  createComment(comment: Comment): Promise < any > {
    return super.createDocument(comment);
  }

  updateComment(comment: Comment) {
    return super.updateDocument(comment);
  }

  deleteComment(comment: Comment) {
    return super.deleteDocument(comment);
  }
}
