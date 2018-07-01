import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  cards = [
    {title: 'invoices.title.invoice1', action: 'cta.show', content: 'filter_1', link: 'invoice1'},
    {title: 'invoices.title.invoice2', action: 'cta.show', content: 'filter_2', link: 'invoice2'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
