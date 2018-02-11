import { Component, OnInit, ElementRef, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../product/product';
import { ProductService } from './../../shared/product/product.service';
import { MenuService } from './../../../menu/menu.service';
import { take } from 'rxjs/operators';
import { DialogComponent } from './../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { CloudinaryUploadService } from './../../../cloudinary/cloudinary-upload.service';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { StringService } from './../../../util/string.service';
import { Filter } from './../../../facet/filter/shared/filter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  products: Product[];
  cache: Product[];
  isLoading = false;
  selected: Product[];
  expanded: any = {};
  @ViewChild('dataTableComponentTable') dataTableComponentTable: any;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;
  @ViewChild('actionsCell') actionsCell: TemplateRef < any > ;
  @ViewChild('imageCell') imageCell: TemplateRef < any > ;
  @ViewChild('priceCell') priceCell: TemplateRef < any > ;
  @ViewChild('desktopCell') desktopCell: TemplateRef < any > ;
  @ViewChild('desktopHeader') desktopHeader: TemplateRef < any > ;
  @ViewChild('translationsFrCell') translationsFrCell: TemplateRef < any > ;
  @ViewChild('publicationCell') publicationCell: TemplateRef < any > ;
  publications: Array < object > ;

  /**
   *
   * @param MatDialog      public  dialog
   * @param Router         private router
   * @param ElementRef     private table
   * @param MenuService    private menuService
   * @param ProductService private productService
   */
  constructor(public dialog: MatDialog,
    private router: Router,
    private table: ElementRef,
    private menuService: MenuService,
    private productService: ProductService,
    private cloudinaryUploadService: CloudinaryUploadService) {
    this.selected = [];
    this.publications = [{
        name: 'Publié',
        value: 'published',
        color: 'primary',
        selected: false
      },
      {
        name: 'Non publié',
        value: 'unpublished',
        color: 'accent',
        selected: false
      }
    ];
  }


  private updatePublication(product: Product) {
    if (product.published === true) {
      if (!product.published_at) {
        product.published_at = new Date();
      }
    } else {
      product.published_at = null;
    }

    this.productService.updateProduct(product);
  }

  updateProductPublication(product: Product, event: { source: any, value: boolean }) {
    product.published = event.value;
    this.updatePublication(product);
  }

  /**
   * set at published at now et activate published to true
   */
  publishProduct() {
    this.selected.forEach((product: Product) => {
      if (product.published === false) {
        product.published = true;
        this.updatePublication(product);
      }
    });
  }

  unpublishProduct() {
    this.selected.forEach((product: Product) => {
      if (product.published === true) {
        product.published = false;
        this.updatePublication(product);
      }
    });
  }

  uploadMedia() {
    this.selected.forEach((product: Product, indexProducts: number) => {
      product.images.forEach((image: string, indexImages: number) => {
        if (image.indexOf('http') !== -1) {
          this.cloudinaryUploadService.uploadImage(product, image);
        }
      });
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
        content: 'Voulez-vous continuer de supprimer le produit ?',
        cta: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteProduct(product);
      }
    });
  }

  showProduct(product: Product) {
    return ([
      '/product/',
      product.key,
      '-',
      StringService.slugify(product.name)
    ]).join('');
  }

  editProduct(product: Product) {
    this.router.navigate(['/admin/product/edit/', product.key]);
  }

  /**
   * Init list of product
   */
  ngOnInit() {
    this.menuService.nextTitle('Products');
    this.columns = [{
      width: 75,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      headerTemplate: this.checkboxHeader,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'images',
      name: 'images',
      flexGrow: 1,
      minWidth: 50,
      cellTemplate: this.imageCell,
    }, {
      prop: 'translations.fr',
      name: 'name (fr)',
      minWidth: 200,
      flexGrow: 2,
      cellTemplate: this.translationsFrCell,
    }, {
      prop: 'category',
      name: 'category',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.desktopCell,
    }, {
      prop: 'price',
      name: 'price',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.priceCell,
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.publicationCell,
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      headerTemplate: this.desktopHeader,
      cellTemplate: this.actionsCell,
    }];
    this.isLoading = true;
    this.productService.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.cache = products;
        this.isLoading = false;
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

  toggleExpandRow(row) {
    this.dataTableComponentTable.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  onScroll(event: any) {}

  onCheckboxChangeFn(event) {}

  /**
   * Filtre sur les colonnes du produit
   * @param {string } }} event [description]
   */
  updateFilter(filter: Filter) {
    if (filter.value && filter.column) {
      const column = filter.column;
      let needle = filter.value;
      if (typeof needle === 'string') {
        needle = needle.toLowerCase();
      }

      // filter our data
      const temp = this.cache.filter((product: Product) => {
        if (column === 'translations.fr') {
          return product.translations.fr.toLowerCase().indexOf(needle) !== -1 || !needle;
        } else if (column === 'price') {
          return product.price.toString(10).indexOf(needle) !== -1 || !needle;
        } else if (column === 'published') {
          return product.published === (needle.toString() === 'true') || !needle;
        }
        return product[column].toLowerCase().indexOf(needle) !== -1 || !needle;
      });

      // update the rows
      this.products = temp;
    }
  }
}
