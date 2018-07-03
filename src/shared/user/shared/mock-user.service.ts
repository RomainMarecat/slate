import { Observable } from 'rxjs/Observable';
import { mockUser } from './mock-user';
import { User } from './user';
import { of } from 'rxjs/internal/observable/of';

export class MockUserService {
  getUser() {
    return mockUser;
  }

  isAdmin(): Observable<boolean> {
    return of(true);
  }

  getAuthState(): Observable<User> {
    return of(mockUser);
  }
}
