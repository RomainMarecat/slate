import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo/shared/seo.service';

@Component({
  selector: 'app-gprd',
  templateUrl: './gprd.component.html',
  styleUrls: ['./gprd.component.scss']
})
export class GprdComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.setSeo('gprd');
  }

  ngOnInit() {
  }

}
