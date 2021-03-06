import { BehaviorSubject, Observable, of } from 'rxjs';
import { mockUser } from './mock-user';
import { User } from './user';

export class MockUserService {
  authorized: string[] = [];
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(mockUser);

  getAuthStateUser(): Observable<User> {
    return of(mockUser);
  }

  getAuthState(): Observable<User> {
    return of(mockUser);
  }

  constructor() {
    this.authorized.push('6glT4N2SUMW2HWibhefumuRiVIh2');
    this.authorized.push('oIAtyPwagRfIKxSwX6O3ncGocyD3');
  }

  isAdmin(): Observable<boolean> {
    return of(true);
  }

  isAuthenticated(): Observable<boolean> {
    return of(true);
  }

  getUser(): User {
    return mockUser;
  }

  getLoginGoogle(): Promise<any> {
    return of({}).toPromise();
  }

  getLoginRedirectGoogle(): Promise<any> {
    return of({}).toPromise();
  }

  loginGoogle() {
  }

  loginFacebook() {
  }

  logout() {
    this.clear();
    return of(true);
  }

  clear() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getCurrentUser() {
    return of(mockUser);
  }
}
