import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() order: Order;

  constructor(private router: Router,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
  }

  navigateTo(key: string) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('/account'),
      'orders',
      key,
      'detail'
    ]);
  }

}
