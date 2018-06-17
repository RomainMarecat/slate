import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/menu/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  features: Array<{ name: string, img: string, url: string }> = DashboardComponent.getFeatures();

  static getFeatures(): { name: string, img: string, url: string }[] {
    return [
      {name: 'dashboard.features.name.material', img: '/assets/images/material.jpg', url: '/admin/material'},
      {name: 'dashboard.features.name.board', img: '/assets/images/board.jpg', url: '/boards'},
      {name: 'dashboard.features.name.chart', img: '/assets/images/chart.jpg', url: '/charts'},
      {name: 'dashboard.features.name.gprd', img: '/assets/images/gprd.jpg', url: '/gprd'},
    ];
  }

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.nextTitle('');
  }

}
