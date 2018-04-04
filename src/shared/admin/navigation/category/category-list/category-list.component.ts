import { Component, OnInit, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CategoryService } from '../../../../category/category.service';
import { Category } from '../../../../category/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  categories: Category[] = [];
  selected: Category[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;

  /**
   * @param {ElementRef} table
   * @param {CategoryService} CategoryService
   */
  constructor(private table: ElementRef, private categoryService: CategoryService) {
    this.isLoading = true;
  }

  /**
   * set at published at now et activate published to true
   */
  publishCategory() {
    this.selected.forEach((category: Category) => {
      if (category.published === false) {
        category.published = true;
        if (!category.published_at) {
          category.published_at = new Date();
        }
      }

      this.categoryService.updateCategory(category);
    });
  }

  /**
   * Delete a Category from list
   */
  deleteCategory() {
    this.selected.forEach((category: Category) => {
      this.categoryService.deleteCategory(category);
    });
  }

  /**
   * Init list of Category
   */
  ngOnInit() {
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoading = false;
      });
    this.columns = [{
        width: 50,
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizeable: false,
        cellTemplate: this.checkboxCell,
        headerTemplate: this.checkboxHeader,
      },
      {
        prop: 'name',
        name: 'name',
        flexGrow: 1
      },
      {
        prop: 'translations.fr',
        name: 'translations.fr',
        flexGrow: 1
      },
      {
        prop: 'description',
        name: 'description',
        flexGrow: 1
      },
      {
        prop: 'keywords',
        name: 'keywords',
        flexGrow: 1
      },
      {
        prop: 'level',
        name: 'level',
        flexGrow: 1
      },
      {
        prop: 'published',
        name: 'published',
        flexGrow: 1
      },
    ];
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}

  onScroll(event: any) {}
}
