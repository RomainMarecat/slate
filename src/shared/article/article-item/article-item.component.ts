import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../shared/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }

}
