import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Session } from '../interfaces/session';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  url = `${environment.middleware}/v1/public/sessions`;
  restictedUrl = `${environment.middleware}/v1/restricted/sessions`;

  constructor(private http: HttpClient) {
  }

  getSessions(user: User): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.url}/users/${user.id}`);
  }

  removeSession(session: Session): Observable<void> {
    return this.http.delete<void>(`${this.restictedUrl}/${session.id}`);
  }

  addSession(session: Session): Observable<Session> {
    const formData = {
      ...session,
      ...{
        user: session.user.id,
        sport: session.sport.id,
        city: session.city.id,
        onlineSession: session.online_session.id
      }
    };

    return this.http.post<Session>(`${this.restictedUrl}`, formData);
  }
}
