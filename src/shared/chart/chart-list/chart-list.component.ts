import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo/shared/seo.service';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.setSeo('chart');
  }

  ngOnInit() {
  }

}
