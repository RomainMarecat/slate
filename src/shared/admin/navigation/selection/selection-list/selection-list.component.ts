import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Selection } from '../../../../selection/selection';
import { SelectionService } from '../../../shared/navigation/selection/selection.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MenuService } from './../../../../menu/menu.service';
import { Product } from './../../../../product/product';
import { ProductService } from './../../../shared/product/product.service';
import { DialogComponent } from './../../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';

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
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;
  @ViewChild('productsCell') productsCell: TemplateRef < any > ;

  /**
   * @param {ElementRef} table
   * @param {SelectionService} SelectionService
   */
  constructor(private table: ElementRef,
    private selectionService: SelectionService,
    private productService: ProductService,
    private router: Router,
    private menuService: MenuService,
    public dialog: MatDialog
  ) {

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
          console.log('The dialog was closed', result);
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
        console.log(selections);
        this.selections = selections;
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
    }, {
      prop: 'translations.fr',
      name: 'translations.fr',
      flexGrow: 1
    }, {
      prop: 'key',
      name: 'Id',
      flexGrow: 1
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'description',
      name: 'description',
      flexGrow: 1
    }, {
      prop: 'keywords',
      name: 'keywords',
      flexGrow: 1
    }, {
      prop: 'level',
      name: 'level',
      flexGrow: 1
    }, {
      prop: 'parent',
      name: 'parent',
      flexGrow: 1
    }, {
      prop: 'products',
      name: 'products',
      cellTemplate: this.productsCell,
      flexGrow: 1
    }, {
      prop: 'published_at',
      name: 'published_at',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, ];
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate(['/admin/navigation/selection/edit/', event.row.key]);
    }
  }

  onScroll(event: any) {}
}
