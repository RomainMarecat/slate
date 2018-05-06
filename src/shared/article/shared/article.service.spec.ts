import { TestBed, inject } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { MockArticleService } from './mock-article.service';

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ArticleService, useClass: MockArticleService}
      ]
    });
  });

  it('should be created', inject([ ArticleService ], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));
});
