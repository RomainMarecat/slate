import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { Cart } from '../../../cart/shared/cart';
import { CartService } from '../../../cart/shared/cart.service';
import { MenuService } from '../../../menu/menu.service';
import { BaseListComponent } from '../../base/base-list/base-list.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent extends BaseListComponent<Cart> implements OnInit {

  @ViewChild('dataTableComponentTable') dataTableComponentTable: DatatableComponent;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;
  @ViewChild('priceCell') priceCell: TemplateRef<any>;
  @ViewChild('desktopCell') desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader') desktopHeader: TemplateRef<any>;
  @ViewChild('dateTmpl') dateTmpl: TemplateRef<any>;
  @ViewChild('statusTmpl') statusTmpl: TemplateRef<any>;

  constructor(protected menuService: MenuService,
              protected cartService: CartService,
              protected localizeRouterService: LocalizeRouterService,
              protected router: Router,
              public dialog: MatDialog) {
    super(menuService, cartService, localizeRouterService, router, dialog);
  }

  ngOnInit() {
    this.isLoading = true;
    this.menuService.nextTitle('menu.title.cart');
    this.columns = this.getColumns();

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

  getColumns(): TableColumn[] {
    return [
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
    ];
  }
}
