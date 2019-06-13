import { Component, OnInit, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CategoryService } from '../../../category/category.service';
import { Category } from '../../../category/category';
import { MenuService } from '../../../menu/menu.service';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  categories: Category[] = [];
  selected: Category[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader', {static: false}) checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;

  constructor(private table: ElementRef,
              private categoryService: CategoryService,
              private menuService: MenuService) {
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
    this.menuService.nextTitle('Categories');
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoading = false;
      });
    this.setColumns();
  }

  setColumns() {
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
      {
        prop: 'published_at',
        name: 'published_at',
        flexGrow: 1
      },
    ];
  }

  /**
   * On select add new list in selection array
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  onScroll(event: any) {
  }
}
