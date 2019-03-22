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

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getPublishedCategories();
  }

  getPublishedCategories() {
    this.categoryService.getPublishedCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      }, () => {
        this.categories = [];
      });
  }
}
