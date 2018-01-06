import { Observable } from 'rxjs/Observable';
import { mockUser } from './mock-user';
import { User } from './user';

export class MockUserService {
  getUser() {
    return mockUser;
  }

  getAuthState(): Observable < User > {
    return Observable.of(mockUser);
  }
}
