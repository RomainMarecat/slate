import { Component, Input, OnInit } from '@angular/core';
import { Delivery } from '../../cart/shared/delivery';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss']
})
export class DeliveryItemComponent implements OnInit {

  @Input() delivery: Delivery;

  constructor() {
  }

  ngOnInit() {
  }
}
