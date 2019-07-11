import { Inject, Injectable } from '@angular/core';
import { Session } from '@romainmarecat/ngx-calendar';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { timeout } from 'rxjs/operators';
import { VisitorService } from '../../firestore/visitor.service';

@Injectable({
  providedIn: 'root'
})
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

  createSession(session: Session): Observable<any> {
    return from(super.createDocument(session))
      .pipe(
        timeout(5000)
      );
  }

  updateSession(session: Session): Observable<void> {
    return from(super.updateDocument(session))
      .pipe(
        timeout(5000)
      );
  }

  deleteSession(session: Session) {
    return super.deleteDocument(session);
  }
}
