import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../interfaces/sport';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  url = `${environment.middleware}/v1/public/sports`;


  constructor(private http: HttpClient) {
  }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.url);
  }
}
