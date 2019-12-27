import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';

@Injectable()
export class UserService {

  private publicUsersUrl = `${environment.middleware}/v1/users`;
  private secureUsersUrl = `${environment.middleware}/v1/secure/users`;

  constructor(private http: HttpClient) {
  }

  get(): Observable<User> {
    const url = `${this.secureUsersUrl}/me`;

    return this.http.get<User>(url);
  }

  patch(user: User): Observable<Response> {
    const url = `${this.secureUsersUrl}/me`;

    return this.http.patch<Response>(url, user);
  }

  getMonoList(): Observable<object[]> {
    const url = `${this.publicUsersUrl}/monos`;

    return this.http.get<object[]>(url);
  }
}
