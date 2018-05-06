import { mockArticle } from './mock-article';
import { Article } from './article';
import { Observable } from 'rxjs/Observable';

export class MockArticleService {

  constructor() {}

  getArticles(): Observable < Array < Article >> {
    return Observable.of([mockArticle]);
  }
}
