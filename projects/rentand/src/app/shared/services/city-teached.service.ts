import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CityTeached } from '../interfaces/city-teached';

@Injectable({
  providedIn: 'root'
})
export class CityTeachedService {

  private citiesTeachedUrl = `${environment.middleware}/v1/cities_teached`;
  private cityTeachedChangedSource = new Subject<string>();
  cityTeachedChangeAnnounced$ = this.cityTeachedChangedSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllCitiesTeached(): Observable<CityTeached[]> {
    const url = `${this.citiesTeachedUrl}/cities`;
    return this.http.get<CityTeached[]>(url);
  }

  getCitiesTeachedByAuth0Id(auth0Id: string): Observable<Array<CityTeached>> {
    const url = `${this.citiesTeachedUrl}/user_id/${auth0Id}`;
    return this.http.get<CityTeached[]>(url);
  }

  getCitiesTeachedWithCitiesByUser(userId: string): Observable<CityTeached[]> {
    return this.http.get<CityTeached[]>(`${this.citiesTeachedUrl}/cities/user_id/${userId}`);
  }

  announceCityTeachedChange() {
    this.cityTeachedChangedSource.next();
  }
}
