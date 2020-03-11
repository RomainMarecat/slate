import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { Observable } from 'rxjs';
import { Cart } from '../../../cart/shared/cart';
import { CartService } from '../../../cart/shared/cart.service';
import { MenuService } from '../../../menu/menu.service';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent extends BaseListComponent<Cart> implements OnInit {

  @ViewChild('dataTableComponentTable', {static: false}) dataTableComponentTable: DatatableComponent;
  @ViewChild('checkboxHeader', {static: false}) checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell', {static: false}) actionsCell: TemplateRef<any>;
  @ViewChild('priceCell', {static: false}) priceCell: TemplateRef<any>;
  @ViewChild('desktopCell', {static: false}) desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader', {static: false}) desktopHeader: TemplateRef<any>;
  @ViewChild('dateTmpl', {static: false}) dateTmpl: TemplateRef<any>;
  @ViewChild('statusTmpl', {static: false}) statusTmpl: TemplateRef<any>;

  constructor(protected menuService: MenuService,
              protected cartService: CartService,
              protected localizeRouterService: LocalizeRouterService,
              protected router: Router,
              public dialog: MatDialog,
              private mediaObserver: MediaObserver) {
    super(menuService, cartService, localizeRouterService, router, dialog);
  }

  ngOnInit() {
    this.isLoading = true;
    this.menuService.nextTitle('menu.title.cart');
    this.getColumns().subscribe(columns => this.columns = columns);

    this.cartService.filters$.next([]);
    this.cartService.query$.next({
      orderBy: {
        column: 'created_at',
        direction: 'desc'
      }
    });
    this.cartService.getCarts()
      .subscribe((carts: Cart[]) => {
        this.documents = carts;
        this.cache = carts;
        this.isLoading = false;
      }, () => {
        this.documents = [];
        this.cache = [];
        this.isLoading = false;
      });
  }

  getColumns(): Observable<TableColumn[]> {
    return new Observable(observer => {
      this.mediaObserver.asObservable()
        .subscribe((mediaChanges: MediaChange[]) => {
          if (mediaChanges && mediaChanges[0] && mediaChanges[0].mqAlias === 'xs') {
            this.rowHeight = 40;
            observer.next([
              {
                prop: 'created_at',
                name: 'created_at',
                flexGrow: 1,
                cellTemplate: this.dateTmpl,
              }, {
                prop: 'status',
                name: 'status',
                flexGrow: 1,
                cellTemplate: this.statusTmpl,
              }, {
                prop: 'total',
                name: 'total',
                flexGrow: 1,
                cellTemplate: this.priceCell,
              }, {
                prop: 'key',
                name: 'Actions',
                flexGrow: 1,
                cellTemplate: this.actionsCell,
              }
            ]);
            observer.complete();
          }

          observer.next([
            {
              width: 75,
              sortable: false,
              canAutoResize: false,
              draggable: false,
              resizeable: false,
              headerTemplate: this.checkboxHeader,
              cellTemplate: this.checkboxCell,
            },
            {
              prop: 'created_at',
              name: 'created_at',
              flexGrow: 1,
              cellTemplate: this.dateTmpl,
            }, {
              prop: 'key',
              name: 'key',
              flexGrow: 1,
              headerTemplate: this.desktopHeader,
              minWidth: 50,
            }, {
              prop: 'user',
              name: 'user',
              flexGrow: 1,
              headerTemplate: this.desktopHeader,
            }, {
              prop: 'status',
              name: 'status',
              flexGrow: 1,
              headerTemplate: this.desktopHeader,
              cellTemplate: this.statusTmpl,
            }, {
              prop: 'total',
              name: 'total',
              flexGrow: 1,
              headerTemplate: this.desktopHeader,
              cellTemplate: this.priceCell,
            }, {
              prop: 'key',
              name: 'Actions',
              flexGrow: 1,
              headerTemplate: this.desktopHeader,
              cellTemplate: this.actionsCell,
            }
          ]);
          observer.complete();
        });
    });
  }

  editDocument(document: Cart) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('admin'),
    ]).then(() => {
      this.router.navigate([
        this.localizeRouterService.translateRoute('admin'),
        'cart',
        'edit',
        document.key
      ]);
    });
  }
}
