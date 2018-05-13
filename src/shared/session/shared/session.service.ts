import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Session } from './session';

@Injectable()
export class SessionService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_SESSION') table: string) {
    super(afs, table);
  }

  getSessions(): Observable<Session[]> {
    return super.getDocuments() as Observable<Session[]>;
  }

  getSession(key: string): Observable<Session> {
    return super.getDocument(key) as Observable<Session>;
  }

  createSession(session: Session): Promise<any> {
    return super.createDocument(session);
  }

  updateSession(session: Session) {
    return super.updateDocument(session);
  }

  deleteSession(session: Session) {
    return super.deleteDocument(session);
  }
}
