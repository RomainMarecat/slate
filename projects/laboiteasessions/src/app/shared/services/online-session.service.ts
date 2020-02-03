import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CityTeached } from '../interfaces/city-teached';
import { Mono } from '../interfaces/mono';
import { SportTeached } from '../interfaces/sport-teached';
import { ProfilService } from './profil.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineSessionService {

  private onlineSessionsUrl = `${environment.middleware}/v1/public/online_sessions`;

  constructor(private http: HttpClient, private profilService: ProfilService) {
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

  loadOnlineSessionByCriteria(mono: Mono, sportTeached: SportTeached, cityTeached: CityTeached) {
    this.getOnlineSessionsByCriteria({
      user: mono.id,
      sportTeached: sportTeached ? sportTeached.id : null,
      cityTeached: cityTeached ? cityTeached.id : null
    })
      .subscribe((onlineSessions: OnlineSession[]) => {
        this.profilService.announceOnlineSessionsChange(onlineSessions);
      }, () => {
        this.profilService.announceOnlineSessionsChange([]);
      });
  }

  loadOnlineSessionsBy(mono: Mono, sportTeached?: SportTeached, cityTeached?: CityTeached) {
    if (mono && sportTeached && cityTeached) {
      this.loadOnlineSessionByCriteria(mono, sportTeached, cityTeached);
    }
  }
}
