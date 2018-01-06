import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../product/product';
import { ProductService } from './../../shared/product/product.service';
import { MenuService } from './../../../menu/menu.service';
import { take } from 'rxjs/operators';
import { DialogComponent } from './../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  products: Product[];
  isLoading = false;
  selected: Product[];
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;
  @ViewChild('actionsCell') actionsCell: TemplateRef < any > ;
  @ViewChild('imageCell') imageCell: TemplateRef < any > ;

  /**
   * @param ElementRef table
   * @param ProductService productService
   */
  constructor(public dialog: MatDialog,
    private router: Router,
    private table: ElementRef,
    private menuService: MenuService,
    private productService: ProductService) {
    this.selected = [];
  }

  /**
   * set at published at now et activate published to true
   */
  publishProduct() {
    this.selected.forEach((product: Product) => {
      if (product.published === false) {
        product.published = true;
        if (!product.published_at) {
          product.published_at = new Date();
        }
      }
      this.productService.updateProduct(product);
    });
  }

  /**
   * Delete a product from list
   */
  deleteProducts() {
    this.selected.forEach((product: Product) => {
      this.productService.deleteProduct(product);
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product);
  }

  confirmDelete(product: Product) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation de suppression du produit',
        content: 'Voulez-vous continuer de supprimer le produit ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteProduct(product);
      }
      console.log('The dialog was closed', result);
    });
  }

  /**
   * Init list of product
   */
  ngOnInit() {
    this.menuService.nextTitle('Products');
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'images',
      name: 'images',
      flexGrow: 1,
      cellTemplate: this.imageCell,
    }, {
      prop: 'translations.fr',
      name: 'name (fr)',
      flexGrow: 1
    }, {
      prop: 'category',
      name: 'category',
      flexGrow: 1
    }, {
      prop: 'price',
      name: 'price',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      cellTemplate: this.actionsCell
    }, ];
    this.productService.getProducts()
      .take(1)
      .subscribe((products: Product[]) => {
        this.products = products;
      });
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
      this.router.navigate(['/admin/product/edit/', event.row.key]);
    }
  }

  onScroll(event: any) {}

  onCheckboxChangeFn(event) {}
}
