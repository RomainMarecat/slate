import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../../shared/sidenav/sidenav.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {}

  toggleSortSidenav(event: Event) {
    this.sidenavService.open();
  }

  toggleFilterSidenav(event: Event) {
    this.sidenavService.open();
  }
}
