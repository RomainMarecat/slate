import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo/shared/seo.service';

export interface Item {
  type: string;
  title: string;
  content: {name: string, color?: string}[] | string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  items: Item[] = TimelineComponent.getItems();

  static getItems(): Item[] {
    return [
      {
        type: 'avatar',
        title: 'Users Joined Today',
        content: 'Lorem ipsum dolor sit amit,consectetur eiusmdd tempors labore et dolore.'
      },
      {
        type: 'article',
        title: 'Some Post',
        content: 'Lorem ipsum dolor sit amit consectetur eiusmdd tempor incididunt ut labore et dolore magna.'
      },
      {
        type: 'calendar',
        title: 'Todo list',
        content: [
          {name: 'hiking', color: 'primary'},
          {name: 'lunch', color: 'accent'},
          {name: 'meet john', color: 'warn'},
        ]
      },
      {
        type: 'news',
        title: 'Latest News',
        content: 'Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna enim ad minim veniam nostrud.'
      }
    ];
  }

  constructor(private seoService: SeoService) {
    this.seoService.setSeo('timeline');
  }

  ngOnInit() {
  }

}
