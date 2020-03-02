import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Booking } from '../interfaces/booking';
import { Mono } from '../interfaces/mono';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mono$: BehaviorSubject<Mono> = new BehaviorSubject<Mono>(null);

  publicUsersUrl = `${environment.middleware}/v1/public/users`;
  secureUsersUrl = `${environment.middleware}/v1/restricted/users`;

  constructor(private http: HttpClient) {
  }

  changeParams(rawValue) {
    if (rawValue.language) {
      rawValue.language = rawValue.language.id;
    }
    if (rawValue.start) {
      rawValue.start = this.formatDate(rawValue.start);
    }
    if (rawValue.end) {
      rawValue.end = this.formatDate(rawValue.end);
    }
    if (rawValue.city && typeof rawValue.city.id !== 'undefined') {
      rawValue.city = rawValue.city.id;
    } else {
      delete rawValue.city;
    }
    return rawValue;
  }

  formatDate(momentDate): string {
    if (momentDate) {
      momentDate = momentDate.format('YYYY-MM-DD');
    }
    return momentDate;
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.publicUsersUrl}`);
  }

  getMonos(rawValue): Observable<Mono[]> {
    rawValue = this.changeParams(rawValue);

    const httpParams = new HttpParams({fromObject: rawValue});

    if (rawValue && rawValue.sport) {
      return this.http.get<Mono[]>(`${this.publicUsersUrl}/sports/${rawValue.sport}`, {params: httpParams});
    }
    return this.http.get<Mono[]>(this.publicUsersUrl, {params: httpParams});
  }

  getMonoBySlug(slug: string): Observable<Mono> {
    const url = `${this.publicUsersUrl}/${slug}`;
    return this.http.get<Mono>(url)
      .pipe(
        map((mono) => {
          this.mono$.next(mono);
          return mono;
        })
      );
  }

  updateUser(user: User): Observable<Response> {
    return this.http.patch<Response>(`${this.secureUsersUrl}`, user);
  }

  getAllUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.secureUsersUrl}/bookings`);
  }
}
