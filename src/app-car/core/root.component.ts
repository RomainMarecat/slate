import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgcCookieConsentService, NgcStatusChangeEvent, NgcInitializeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from '@angular/platform-browser';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { UserService } from '../../shared/user/user.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { environment } from '../../environments/environment.car';
import { Favicon } from '../../shared/favicon/favicon.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ]
})
export class AppRootComponent implements OnInit, OnDestroy {

  // Keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;

  /**
   * Root Constructor
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              public userService: UserService,
              private loaderService: LoaderService,
              private i18nService: I18nService,
              private ccService: NgcCookieConsentService,
              private meta: Meta,
              private title: Title,
              private favicon: Favicon) {
    this.title.setTitle('Men In Car');
    this.favicon.addLink('image/x-icon', `/assets/images/${environment.app_name}/icons/favicon.ico`);
    this.meta.addTags([
      {rel: 'apple-touch-icon', sizes: '57x57', href: `/assets/images/${environment.app_name}/icons/apple-icon-57x57.png`},
      {rel: 'apple-touch-icon', sizes: '60x60', href: `/assets/images/${environment.app_name}/icons/apple-icon-60x60.png`},
      {rel: 'apple-touch-icon', sizes: '72x72', href: `/assets/images/${environment.app_name}/icons/apple-icon-72x72.png`},
      {rel: 'apple-touch-icon', sizes: '76x76', href: `/assets/images/${environment.app_name}/icons/apple-icon-76x76.png`},
      {rel: 'apple-touch-icon', sizes: '114x114', href: `/assets/images/${environment.app_name}/icons/apple-icon-114x114.png`},
      {rel: 'apple-touch-icon', sizes: '120x120', href: `/assets/images/${environment.app_name}/icons/apple-icon-120x120.png`},
      {rel: 'apple-touch-icon', sizes: '144x144', href: `/assets/images/${environment.app_name}/icons/apple-icon-144x144.png`},
      {rel: 'apple-touch-icon', sizes: '152x152', href: `/assets/images/${environment.app_name}/icons/apple-icon-152x152.png`},
      {rel: 'apple-touch-icon', sizes: '180x180', href: `/assets/images/${environment.app_name}/icons/apple-icon-180x180.png`},
      {rel: 'icon', type: 'image/png', sizes: '192x192', href: `/assets/images/${environment.app_name}/icons/android-icon-192x192.png`},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: `/assets/images/${environment.app_name}/icons/favicon-32x32.png`},
      {rel: 'icon', type: 'image/png', sizes: '96x96', href: `/assets/images/${environment.app_name}/icons/favicon-96x96.png`},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: `/assets/images/${environment.app_name}/icons/favicon-16x16.png`},
      {rel: 'manifest', href: `/assets/images/${environment.app_name}/icons/manifest.json`},
      {name: 'msapplication-TileColor', content: '#ffffff'},
      {
        name: 'msapplication-TileImage',
        content: `/assets/images/${environment.app_name}/icons/ms-icon-144x144.png`
      },
      {name: 'theme-color', content: '#ffffff'},
    ]);
  }

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
  }
}
