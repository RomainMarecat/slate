import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnlineSessionService {

  private onlineSessionsUrl = `${environment.middleware}/v1/public/online_sessions`;

  constructor(private http: HttpClient) {
  }

  getOnlineSessionsByCriteria(criteria: object): Observable<OnlineSession[]> {
    Object.keys(criteria).forEach((key: string) => {
      if (!criteria[key]) {
        delete criteria[key];
      }
    });

    const httpParams: HttpParams = new HttpParams({fromObject: criteria as any});

    return this.http.get<OnlineSession[]>(this.onlineSessionsUrl, {params: httpParams});
  }
}
