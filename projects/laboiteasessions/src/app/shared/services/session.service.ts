import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Session } from '../interfaces/session';
import { User } from '../interfaces/user';
import { EventType } from '../interfaces/event';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { SportTeached } from '../interfaces/sport-teached';
import { CityTeached } from '../interfaces/city-teached';
import { MeetingPoint } from '../interfaces/meeting-point';

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

  addSessionFromCalendar(session: Session,
                         onlineSession: OnlineSession,
                         participants: number,
                         fees: number,
                         sportTeached: SportTeached,
                         cityTeached: CityTeached,
                         meetingPoint: MeetingPoint): Session {
    if (session &&
      session.details) {
      session.details = {
        price: this.getSessionPrice(onlineSession, participants, fees),
        event_type: EventType.session,
        nb_persons: participants,
        sport: sportTeached.sport,
        city: cityTeached.city,
        meeting_point: meetingPoint,
        level: null,
        age: null
      };
    }

    return session;
  }

  getSessionPrice(onlineSession: OnlineSession, participants: number, fees: number): number {
    if (onlineSession
      && participants
      && onlineSession.price) {
      return parseFloat(((onlineSession.price * participants *
        fees / 100) + onlineSession.price * participants).toFixed(2));
    }
    return 0;
  }

  addSession(session: Session): Observable<Session> {
    const formData = {
      ...session,
      ...{
        user: session.user.id,
        sport: session.sport.id,
        city: session.city.id,
        onlineSession: session.online_session.id,
        nbPersons: session.nb_persons
      }
    };

    return this.http.post<Session>(`${this.restictedUrl}`, formData);
  }
}
