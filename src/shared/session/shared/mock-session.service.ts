import { Observable } from 'rxjs/Observable';
import { Session } from './session';
import { of } from 'rxjs/observable/of';
import { mockSession, mockSessions } from './mock-session';

export class MockSessionService {

  getSessions(): Observable<Session[]> {
    return of(mockSessions);
  }

  getSession(key: string): Observable<Session> {
    return of(mockSession);
  }

  createSession(session: Session): Promise<any> {
    return of(mockSession).toPromise();
  }
}
