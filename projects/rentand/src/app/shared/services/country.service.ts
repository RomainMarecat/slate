import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Country } from '../interfaces/country';

@Injectable()
export class CountryService {
  private rentandCountriesUrl = `${environment.middleware}/v1/countries`;

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.rentandCountriesUrl + '?sort_by={"demonym.fr":}');
  }

  getCountry(alpha: string): Observable<Country> {
    const url = `${this.rentandCountriesUrl}/alpha/${alpha}`;
    return this.http.get<Country>(url);
  }
}
