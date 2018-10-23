import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Comment } from './comment';

@Injectable()
export class CommentService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_COMMENT') table: string) {
    super(afs, table);
  }

  getComments(): Observable<Comment[]> {
    return <Observable<Comment[]>> super.getDocuments();
  }

  getComment(key: string): Observable<Comment> {
    return <Observable<Comment>> super.getDocument(key);
  }

  createComment(comment: Comment): Promise<any> {
    return super.createDocument(comment);
  }

  updateComment(comment: Comment) {
    return super.updateDocument(comment);
  }

  deleteComment(comment: Comment) {
    return super.deleteDocument(comment);
  }
}
