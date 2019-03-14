import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { OrderService } from '../shared/order.service';
import { AlertService } from '../../popup/alert.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() limit: number;

  orders: Order[] = [];

  isLoading: boolean;

  @Input() showAllOrdersListButton = false;

  constructor(private orderService: OrderService,
              private loaderService: LoaderService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  /**
   * La liste des commandes
   */
  getOrders() {
    this.isLoading = true;
    this.loaderService.show();
    this.orderService.getOrders()
      .subscribe((res: Order[]) => {
        this.loaderService.hide();
        this.orders = res;
        this.isLoading = false;
      }, () => {
        this.loaderService.hide();
        this.alertService.show('error.api.general');
        this.isLoading = false;
      });
  }
}
