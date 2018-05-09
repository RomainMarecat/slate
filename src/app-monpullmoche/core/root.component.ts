import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { UserService } from '../../shared/user/user.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { Favicon } from '../../shared/favicon/favicon.service';
import { environment } from '../../environments/environment.car';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ]
})
export class AppRootComponent implements OnInit {

  /**
   * Root Constructor
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              private meta: Meta,
              private title: Title,
              private favicon: Favicon) {
    this.title.setTitle('Mon pull moche');
    this.favicon.addLink('image/x-icon', `/assets/images/${environment.app_name}/icons/favicon.ico`);
    this.meta.addTags([
      {rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/images/clothe/icons/apple-icon-57x57.png'},
      {rel: 'apple-touch-icon', sizes: '60x60', href: '/assets/images/clothe/icons/apple-icon-60x60.png'},
      {rel: 'apple-touch-icon', sizes: '72x72', href: '/assets/images/clothe/icons/apple-icon-72x72.png'},
      {rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/images/clothe/icons/apple-icon-76x76.png'},
      {rel: 'apple-touch-icon', sizes: '114x114', href: '/assets/images/clothe/icons/apple-icon-114x114.png'},
      {rel: 'apple-touch-icon', sizes: '120x120', href: '/assets/images/clothe/icons/apple-icon-120x120.png'},
      {rel: 'apple-touch-icon', sizes: '144x144', href: '/assets/images/clothe/icons/apple-icon-144x144.png'},
      {rel: 'apple-touch-icon', sizes: '152x152', href: '/assets/images/clothe/icons/apple-icon-152x152.png'},
      {rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/images/clothe/icons/apple-icon-180x180.png'},
      {rel: 'icon', type: 'image/png', sizes: '192x192', href: '/assets/images/clothe/icons/android-icon-192x192.png'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/images/clothe/icons/favicon-32x32.png'},
      {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/images/clothe/icons/favicon-96x96.png'},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/images/clothe/icons/favicon-16x16.png'},
      {rel: 'manifest', href: '/assets/images/clothe/icons/manifest.json'},
      {name: 'msapplication-TileColor', content: '#ffffff'},
      {name: 'msapplication-TileImage', content: '/assets/images/clothe/icons/ms-icon-144x144.png'},
      {name: 'theme-color', content: '#ffffff'},
    ]);
  }

  ngOnInit() {

  }
}
