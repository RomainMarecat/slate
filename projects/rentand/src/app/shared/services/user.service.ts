import { HttpClient } from '@angular/common/http';
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

  getMonos(): Observable<Mono[]> {
    return this.http.get<Mono[]>(this.publicUsersUrl);
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

  getMonoList(): Observable<object[]> {
    const url = `${this.publicUsersUrl}/monos`;

    return this.http.get<object[]>(url);
  }

  getAllUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.secureUsersUrl}/bookings`);
  }
}
