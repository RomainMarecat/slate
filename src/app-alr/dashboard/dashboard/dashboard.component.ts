import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/menu/menu.service';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from '../../../shared/seo/shared/seo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  features: Array<{name: string, img: string, url: string}> = DashboardComponent.getFeatures();

  static getFeatures(): {name: string, img: string, url: string}[] {
    return [
      {name: 'dashboard.features.name.product', img: '/assets/images/product.jpg', url: '/products'},
      {
        name: 'dashboard.features.name.layout-builder',
        img: '/assets/images/layout-builder.jpg',
        url: '/layout-builder'
      },
      {name: 'dashboard.features.name.material', img: '/assets/images/material.jpg', url: '/material'},
      {name: 'dashboard.features.name.board', img: '/assets/images/board.jpg', url: '/boards'},
      {name: 'dashboard.features.name.chart', img: '/assets/images/chart.jpg', url: '/charts'},
      {name: 'dashboard.features.name.gprd', img: '/assets/images/gprd.jpg', url: '/gprd'},
      {name: 'dashboard.features.name.invoice', img: '/assets/images/invoice.jpg', url: '/invoices'},
      {name: 'dashboard.features.name.user', img: '/assets/images/user.jpg', url: '/users'},
      {name: 'dashboard.features.name.timeline', img: '/assets/images/timeline.jpg', url: '/timeline'},
      {name: 'dashboard.features.name.admin', img: '/assets/images/admin.jpg', url: '/admin'},
      {name: 'dashboard.features.name.article', img: '/assets/images/article.jpg', url: '/article'},
      {name: 'dashboard.features.name.faq', img: '/assets/images/faq.jpg', url: '/faq'},
      {name: 'dashboard.features.name.map', img: '/assets/images/map.jpg', url: '/map'},
      {name: 'dashboard.features.name.cart', img: '/assets/images/cart.jpg', url: '/cart/index'},
      {name: 'dashboard.features.name.contact', img: '/assets/images/contact.jpg', url: '/contact-us'},
      {name: 'dashboard.features.name.calendar', img: '/assets/images/agenda.jpg', url: '/calendar'},
      {name: 'dashboard.features.name.simple-calendar', img: '/assets/images/agenda.jpg', url: '/agenda/simple-agenda'},
      {name: 'dashboard.features.name.firebase-calendar', img: '/assets/images/agenda.jpg', url: '/agenda/firebase-agenda'},
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
