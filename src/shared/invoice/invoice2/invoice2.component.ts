import { Component, OnInit } from '@angular/core';
import { Product } from '../../product/shared/product';
import { mockInvoiceProducts } from '../../product/shared/mock-product';

@Component({
  selector: 'app-invoice2',
  templateUrl: './invoice2.component.html',
  styleUrls: ['./invoice2.component.scss']
})
export class Invoice2Component implements OnInit {

  displayedColumns: string[] = ['key', 'name', 'unit_price', 'quantity', 'amount'];

  dataSource: Array<Product> = Invoice2Component.getProducts();

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
