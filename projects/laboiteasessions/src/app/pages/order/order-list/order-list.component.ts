import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/interfaces/order';
import { OrderService } from '../../../shared/services/order.service';
import { take } from 'rxjs/operators';

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

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  /**
   * La liste des commandes
   */
  getOrders() {
    this.isLoading = true;
    this.orderService.getOrders()
      .pipe(take(1))
      .subscribe((res: Order[]) => {
        this.orders = res;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }
}
