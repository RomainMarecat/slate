import { mockComment } from './mock-comment';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';

export class MockCommentService {

  constructor() {
  }

  getComments(): Observable<Array<Comment>> {
    return of([mockComment]);
  }
}
