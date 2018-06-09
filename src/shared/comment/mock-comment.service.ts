import { mockComment } from './mock-comment';
import { Comment } from './comment';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/internal/observable/of';

export class MockCommentService {

  constructor() {
  }

  getComments(): Observable<Array<Comment>> {
    return of([mockComment]);
  }
}
