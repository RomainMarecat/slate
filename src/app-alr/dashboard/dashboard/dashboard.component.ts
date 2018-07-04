import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  features: Array<{name: string, img: string, url: string}> = DashboardComponent.getFeatures();

  static getFeatures(): {name: string, img: string, url: string}[] {
    return [
      {name: 'dashboard.features.name.material', img: '/assets/images/material.jpg', url: '/material'},
      {name: 'dashboard.features.name.board', img: '/assets/images/board.jpg', url: '/boards'},
      {name: 'dashboard.features.name.chart', img: '/assets/images/chart.jpg', url: '/charts'},
      {name: 'dashboard.features.name.gprd', img: '/assets/images/gprd.jpg', url: '/gprd'},
      {name: 'dashboard.features.name.invoice', img: '/assets/images/invoice.jpg', url: '/invoices'},
      {name: 'dashboard.features.name.user', img: '/assets/images/user.jpg', url: '/users'},
    ];
  }

  /**
   *
   * @param {MenuService} menuService
   * @param {Router} router
   */
  constructor(private menuService: MenuService,
              private router: Router) {
  }

  /**
   * le titre du menu à vide
   */
  ngOnInit() {
    this.menuService.nextTitle('');
  }

  /**
   * Naviguer à ...
   * @param {string} url
   */
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
