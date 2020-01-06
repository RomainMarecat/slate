import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private rentandLanguagesUrl = `${environment.middleware}/v1/public/languages`;

  constructor(private httpClient: HttpClient) {
  }

  getLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.rentandLanguagesUrl + '?sort_by={"_iso6391":1}');
  }

  getLanguagesSortedBy(sortBy: string): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.rentandLanguagesUrl + '?sort_by=' + sortBy);
  }

  getLanguageByCode(code: string): Observable<Language> {
    const url = `${this.rentandLanguagesUrl}/${code}`;
    return this.httpClient.get<Language>(url);
  }
}
