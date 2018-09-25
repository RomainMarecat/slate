import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { Article } from '../shared/article';
import { AlertService } from '../../popup/alert.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.query$.next({
      limit: 10,
      filters: [{
        column: 'published',
        operator: '==',
        value: true
      }]
    });
    this.articleService.getArticles()
      .subscribe((articles: Article[]) => {
        this.articles = articles.sort((x, y) => {
          return (x.published_at as {seconds: number}).seconds - (y.published_at as {seconds: number}).seconds;
        });
      }, (err) => {
        this.alertService.show(err);
        this.articles = [];
      });
  }

}
