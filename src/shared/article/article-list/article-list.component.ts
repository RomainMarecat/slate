import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { AlertService } from '../../popup/alert.service';
import { SeoService } from '../../seo/shared/seo.service';
import { Timestamp } from '../../util/timestamp';
import { Article } from '../shared/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private seoService: SeoService,
              private articleService: ArticleService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
    this.loaderService.show();
    this.seoService.setSeo('articles');
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
          return (x.published_at as Timestamp).seconds - (y.published_at as Timestamp).seconds;
        });
        this.loaderService.hide();
      }, (err) => {
        this.alertService.show(err);
        this.articles = [];
        this.loaderService.hide();
      });
  }
}
