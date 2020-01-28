import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SportTeached } from '../interfaces/sport-teached';

@Injectable({
  providedIn: 'root'
})
export class SportTeachedService {

  private sportTeachedUrl = `${environment.middleware}/v1/public/sports_teached`;

  constructor(private http: HttpClient) {
  }

  getSportsTeachedByAuth0Id(auth0Id: string): Observable<Array<SportTeached>> {
    const url = `${this.sportTeachedUrl}/user_id/${auth0Id}`;
    return this.http.get<SportTeached[]>(url);
  }

  getSportsTeachedWithSportsByAuth0Id(auth0Id: string): Observable<Array<SportTeached>> {
    const url = `${this.sportTeachedUrl}/sports/user_id/${auth0Id}`;
    return this.http.get<SportTeached[]>(url);
  }
}
