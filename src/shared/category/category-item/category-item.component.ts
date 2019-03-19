import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {

  @Input() options: {
    image_link: boolean;
    text_link: boolean;
    display_icon: boolean;
    display_image: boolean;
  };

  @Input() category: Category;

  constructor() {
  }

  ngOnInit() {
  }

}
