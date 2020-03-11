import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() order: Order;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(key: string) {
    this.router.navigate([
      '/account',
      'orders',
      key,
      'detail'
    ]);
  }

}
