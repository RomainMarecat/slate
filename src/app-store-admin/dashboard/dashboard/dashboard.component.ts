import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { MenuService } from '../../../shared/menu/menu.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';

@Component({
  selector: 'app-store-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  features: Array<{name: string, img: string, url: string}> = DashboardComponent.getFeatures();

  static getFeatures(): {name: string, img: string, url: string}[] {
    return [
      {name: 'dashboard.features.name.order', img: '/assets/images/cart.jpg', url: '/admin/order'},
      {name: 'dashboard.features.name.cart', img: '/assets/images/cart.jpg', url: '/admin/cart'},
      {name: 'dashboard.features.name.contact', img: '/assets/images/contact.jpg', url: '/admin/contact'},
      {name: 'dashboard.features.name.agenda', img: '/assets/images/agenda.jpg', url: '/agenda/simple-agenda'},
      {name: 'dashboard.features.name.agenda', img: '/assets/images/agenda.jpg', url: '/agenda/firebase-agenda'},
    ];
  }

  constructor(private menuService: MenuService,
              private router: Router,
              private localizeService: LocalizeRouterService,
              private meta: Meta,
              private translate: TranslateService,
              private seoService: SeoService) {
    this.seoService.setSeo('dashboard');
  }

  /**
   * le titre du menu à vide
   */
  ngOnInit() {
    this.menuService.nextTitle('');
  }

  /**
   * Naviguer à ...
   */
  navigateTo(url: string) {
    this.router.navigate([this.localizeService.translateRoute(url)]);
  }

}
