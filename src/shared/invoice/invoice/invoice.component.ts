import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo/shared/seo.service';

@Component({
  selector: 'app-alr-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.setSeo('invoice');
  }

  ngOnInit() {
  }

}
