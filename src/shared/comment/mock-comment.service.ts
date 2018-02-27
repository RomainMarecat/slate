import { mockComment } from './mock-comment';
import { Comment } from './comment';
import { Observable } from 'rxjs/Observable';

export class MockCommentService {

  constructor() {}

  getComments(): Observable < Array < Comment >> {
    return Observable.of([mockComment]);
  }
}