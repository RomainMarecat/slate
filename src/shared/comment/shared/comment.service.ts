import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { timeout } from 'rxjs/operators';
import { Comment } from './comment';

@Injectable()
export class CommentService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_COMMENT') table: string) {
    super(afs, table);
  }

  getComments(): Observable<Comment[]> {
    return <Observable<Comment[]>>super.getDocuments();
  }

  getComment(key: string): Observable<Comment> {
    return <Observable<Comment>>super.getDocument(key);
  }

  createComment(comment: Comment): Observable<any> {
    return from(super.createDocument(comment))
      .pipe(
        timeout(5000)
      );
  }

  updateComment(comment: Comment): Observable<void> {
    return from(super.updateDocument(comment))
      .pipe(
        timeout(5000)
      );
  }

  deleteComment(comment: Comment) {
    return super.deleteDocument(comment);
  }
}
