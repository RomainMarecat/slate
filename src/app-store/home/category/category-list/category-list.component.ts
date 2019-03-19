import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/category/category.service';
import { Category } from '../../../../shared/category/category';
import { CategoryOption } from '../../../../shared/category/category-option';

@Component({
  selector: 'app-category-default-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() options: CategoryOption;

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
    this.categoryService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      }
    ]);
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
