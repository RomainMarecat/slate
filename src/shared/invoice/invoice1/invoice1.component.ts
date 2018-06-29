import { Component, OnInit } from '@angular/core';
import { Product } from 'shared/product/product';
import { mockInvoiceProducts } from 'shared/product/mock-product';

@Component({
  selector: 'app-invoice1',
  templateUrl: './invoice1.component.html',
  styleUrls: ['./invoice1.component.scss']
})
export class Invoice1Component implements OnInit {

  displayedColumns: string[] = ['key', 'name', 'unit_price', 'quantity', 'amount'];

  dataSource: Array<Product> = Invoice1Component.getProducts();

  total: number;
  fees = 5.40;
  subtotal: number;

  static getProducts(): Product[] {
    return mockInvoiceProducts;
  }

  constructor() {
    this.getSubTotal();
    this.getTotal();
  }

  ngOnInit() {
  }

  getTotal() {
    this.total = this.dataSource.reduce((acc, next) => acc + (next.quantity * next.price), 0) + this.fees;
  }

  getSubTotal() {
    this.subtotal = this.dataSource.reduce((acc, next) => acc + (next.quantity * next.price), 0);
  }


}
