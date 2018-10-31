import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo/shared/seo.service';

@Component({
  selector: 'app-alr-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.setSeo('user');
  }

  ngOnInit() {
  }

}
