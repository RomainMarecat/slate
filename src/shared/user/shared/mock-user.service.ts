import { Observable, of } from 'rxjs';
import { mockUser } from './mock-user';
import { User } from './user';

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
