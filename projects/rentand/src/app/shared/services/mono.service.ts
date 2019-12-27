import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Mono } from '../interfaces/mono';

@Injectable({
  providedIn: 'root'
})
export class MonoService {

  mono$: BehaviorSubject<Mono> = new BehaviorSubject<Mono>(null);

  monoUrl = `${environment.middleware}/v1/users`;

  constructor(private http: HttpClient) {
  }

  getMonos(): Observable<Mono[]> {
    return this.http.get<Mono[]>(this.monoUrl);
  }

  getMonoBySlug(slug: string): Observable<Mono> {
    const url = `${this.monoUrl}/${slug}`;
    return this.http.get<Mono>(url)
      .pipe(
        map((mono) => {
          this.mono$.next(mono);
          return mono;
        })
      );
  }
}
