import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/category/category.service';
import { Category } from '../../../../shared/category/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() options: {
    display_title: boolean;
    display_subtitle: boolean;
    image_link: boolean;
    text_link: boolean;
    display_icon: boolean;
    display_image: boolean;
  };

  /**
   * Default categories
   */
  categories: Category[] = [];

  static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories.map((category: Category) => {
          category.metadata = {
            size: CategoryListComponent.randomIntFromInterval(25, 40)
          };
          return category;
        });
      }, () => {
        this.categories = [];
      });
  }

}
