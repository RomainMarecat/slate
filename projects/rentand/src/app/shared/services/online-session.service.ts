import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OnlineSession } from '../interfaces/online-session';

@Injectable({
  providedIn: 'root'
})
export class OnlineSessionService {

  private onlineSessionsUrl = `${environment.middleware}/v1/public/online_sessions`;

  constructor(private http: HttpClient) {
  }

  getOnlineSessionsByCriteria(criteria: object): Observable<OnlineSession[]> {
    let url = `${this.onlineSessionsUrl}`;
    for (const c in criteria) {
      if (c === 'user_id') {
        url = url.concat('/user_id/', criteria[c].user_id);
      } else if (c === 'sport_teached') {
        url = url.concat('/sport_teached/', criteria[c]._id.$oid);
      } else if (c === 'city_teached') {
        url = url.concat('/city_teached/', criteria[c]._id.$oid);
      } else if (c === 'start') {
        url = url.concat('/start/', criteria[c]);
      } else if (c === 'end') {
        url = url.concat('/end/', criteria[c]);
      }
    }
    return this.http.get<OnlineSession[]>(url);
  }
}
