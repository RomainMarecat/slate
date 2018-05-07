import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { Article } from '../shared/article';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: [ './article-list.component.scss' ]
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.orderBy$.next({
      column: 'published_at',
      direction: 'desc'
    } as Sort);
    this.articleService.filters$.next([ {
      column: 'published',
      operator: '==',
      value: true
    } ] as Filter[]);
    this.articleService.getArticles()
      .subscribe((articles: Article[]) => {
        this.articles = articles;
      }, (err) => {
        this.articles = [];
      });
  }

}
