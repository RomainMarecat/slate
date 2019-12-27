import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { City } from '../interfaces/city';

@Injectable()
export class CityService {

  private citiesUrl = `${environment.middleware}/v1/cities`;
  private secureCityUrl = `${environment.middleware}/v1/secure/cities`;

  constructor(private http: HttpClient) {
  }

  getCityByGoogleId(googleId: string): Observable<City> {
    const url = `${this.citiesUrl}/google_id/` + googleId;
    return this.http.get<City>(url);
  }

  getCity(id: string): Observable<City> {
    const url = `${this.citiesUrl}/` + id;
    return this.http.get<City>(url);
  }

  getAllUserCities(): Observable<City[]> {
    const url = this.secureCityUrl;
    return this.http.get<City[]>(url);
  }

  deleteCity(city: City): Observable<Response> {
    const url = `${this.secureCityUrl}/${city.id}`;
    return this.http.delete<Response>(url);
  }

  updateCity(city: City): Observable<Response> {
    const url = `${this.secureCityUrl}/${city.id}`;
    return this.http.patch<Response>(url, JSON.stringify(city));
  }

  createCity(city: City): Observable<Response> {
    const url = `${this.secureCityUrl}`;
    return this.http.post<Response>(url, JSON.stringify(city));
  }
}
