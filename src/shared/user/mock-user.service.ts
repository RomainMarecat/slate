import { Observable } from 'rxjs/Observable';
import { mockUser } from './mock-user';
import { User } from './user';

export class MockUserService {
  getUser() {
    return mockUser;
  }

  isAdmin(): Observable < boolean > {
    return Observable.of(true);
  }

  getAuthState(): Observable < User > {
    return Observable.of(mockUser);
  }
}
