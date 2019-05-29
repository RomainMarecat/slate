import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Selection } from '../../../selection/selection';
import { Router } from '@angular/router';
import { MenuService } from '../../../menu/menu.service';
import { Product } from '../../../product/shared/product';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { SelectionService } from '../../../selection/selection.service';
import { ProductService } from '../../../product/shared/product.service';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any[];
  selections: Selection[] = [];
  selected: Selection[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('productsCell') productsCell: TemplateRef<any>;
  @ViewChild('publishedCell') publishedCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;
  @ViewChild('desktopCell') desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader') desktopHeader: TemplateRef<any>;

  constructor(private selectionService: SelectionService,
              private productService: ProductService,
              private router: Router,
              private menuService: MenuService,
              public dialog: MatDialog,
              private localizeRouterService: LocalizeRouterService) {
    this.selected = [];
    this.isLoading = true;
  }

  /**
   * set at published at now et activate published to true
   */
  publishSelection() {
    this.selected.forEach((selection: Selection) => {
      if (selection.published === false) {
        selection.published = true;
        if (!selection.published_at) {
          selection.published_at = new Date();
        }
      }

      this.selectionService.updateSelection(selection);
    });
  }

  unpublishSelection() {
    this.selected.forEach((selection: Selection) => {
      if (selection.published === true) {
        selection.published = false;
        selection.published_at = null;
      }

      this.selectionService.updateSelection(selection);
    });
  }

  changePublishedStatus(selection: Selection) {
    selection.published = !selection.published;
    if (selection.published === false) {
      selection.published_at = null;
    } else {
      selection.published_at = new Date();
    }
    this.selectionService.updateSelection(selection);
  }

  /**
   * Delete a Selection from list
   */
  deleteSelection() {
    this.selected.forEach((selection: Selection) => {
      this.selectionService.deleteSelection(selection);
    });
  }

  showProducts(selection: Selection) {
    this.productService.getProducts()
      .subscribe((products) => {
        products = products.filter((product: Product) => {
          return selection.products.includes(product.key);
        });

        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          data: {
            content: products,
            cta: 'Fermer'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
      });
  }

  /**
   * Init list of Selection
   */
  ngOnInit() {
    this.menuService.nextTitle('Selection');
    this.selectionService.getSelections()
      .subscribe((selections: Selection[]) => {
        this.selections = selections.sort((prev: Selection, next: Selection) => {
          return prev.translations.fr > next.translations.fr ? 1 : -1;
        });
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
    }, {
      width: 100,
      prop: 'translations.fr',
      name: 'translations.fr',
      flexGrow: 1
    }, {
      prop: 'key',
      name: 'Id',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.desktopCell
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.desktopCell
    }, {
      prop: 'description',
      name: 'description',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.desktopCell
    }, {
      prop: 'keywords',
      name: 'keywords',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.desktopCell
    }, {
      prop: 'level',
      name: 'level',
      flexGrow: 1
    }, {
      prop: 'parent',
      name: 'parent',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.desktopCell
    }, {
      prop: 'products',
      name: 'products',
      headerTemplate: this.desktopHeader,
      cellTemplate: this.productsCell,
      flexGrow: 1
    }, {
      prop: 'published_at',
      name: 'published_at',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.desktopCell
    }, {
      prop: 'published',
      name: 'published',
      headerTemplate: this.desktopHeader,
      cellTemplate: this.publishedCell,
      width: 50,
      flexGrow: 1
    }, {
      prop: 'id',
      name: 'actions',
      headerTemplate: this.desktopHeader,
      cellTemplate: this.actionsCell,
      width: 50,
      flexGrow: 1,
    }];
  }

  /**
   * On select add new list in selection array
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate([
        this.localizeRouterService.translateRoute('/admin'),
        'navigation',
        'selection',
        'edit',
        event.row.key
      ]);
    }
  }

  onScroll(event: any) {
  }
}
