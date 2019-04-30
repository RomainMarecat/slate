import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { Order } from '../../../order/shared/order';
import { MenuService } from '../../../menu/menu.service';
import { LocalizeRouterService } from 'localize-router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrderService } from '../../../order/shared/order.service';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseListComponent<Order> implements OnInit {

  @ViewChild('dataTableComponentTable') dataTableComponentTable: DatatableComponent;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;
  @ViewChild('priceCell') priceCell: TemplateRef<any>;
  @ViewChild('desktopCell') desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader') desktopHeader: TemplateRef<any>;
  @ViewChild('dateTmpl') dateTmpl: TemplateRef<any>;

  constructor(protected menuService: MenuService,
              protected orderService: OrderService,
              protected localizeRouterService: LocalizeRouterService,
              protected router: Router,
              public dialog: MatDialog) {
    super(menuService, orderService, localizeRouterService, router, dialog);
  }

  ngOnInit() {
    this.isLoading = true;
    this.menuService.nextTitle('menu.title.order');
    this.columns = this.getColumns();

    this.orderService.query$.next({
      orderBy: {
        column: 'created_at',
        direction: 'desc'
      }
    });
    this.orderService.getOrders()
      .subscribe((orders: Order[]) => {
        this.documents = orders;
        this.cache = orders;
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
