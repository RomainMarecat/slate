import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { timeout } from 'rxjs/operators';
import { VisitorService } from '../../firestore/visitor.service';
import { Conversation } from './conversation';

@Injectable()
export class ConversationService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CONVERSATION') table: string) {
    super(afs, table);
  }

  getConversations(): Observable<Conversation[]> {
    return super.getDocuments() as Observable<Conversation[]>;
  }

  getConversation(key: string): Observable<Conversation> {
    return super.getDocument(key) as Observable<Conversation>;
  }

  createConversation(conversation: Conversation): Observable<DocumentReference> {
    return from(super.createDocument(conversation))
      .pipe(
        timeout(5000)
      );
  }

  updateConversation(conversation: Conversation): Observable<void> {
    return from(super.updateDocument(conversation))
      .pipe(
        timeout(5000)
      );
  }

  deleteConversation(conversation: Conversation) {
    return super.deleteDocument(conversation);
  }
}
