import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { OrderService } from '../shared/order.service';
import { AlertService } from '../../popup/alert.service';
import { LoaderService } from '../../loader/loader.service';
import { FirebaseError } from 'firebase';
import { Subscription } from 'rxjs';

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
    const orderSubscription: Subscription = this.orderService.getOrders()
      .subscribe((res: Order[]) => {
        this.loaderService.hide();
        this.orders = res;
        this.isLoading = false;

        if (orderSubscription) {
          orderSubscription.unsubscribe();
        }
      }, (err: FirebaseError) => {
        this.alertService.openBottomSheetMessage({title: 'error.api.general', message: err.message});
        this.loaderService.hide();
        this.isLoading = false;
      });
  }
}
