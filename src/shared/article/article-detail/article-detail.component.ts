import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../shared/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../shared/article.service';
import { SeoService } from '../../seo/shared/seo.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  @Input() article: Article;

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private seoService: SeoService) {
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        if (key) {
          this.articleService.getArticle(key)
            .subscribe((article: Article) => {
              this.article = article;
              this.seoService.setSeo('article', {article: article});
            });
        }
      }
    });
  }

}
