import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgcCookieConsentService, NgcStatusChangeEvent, NgcInitializeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { MenuConfiguration } from '../../shared/menu/shared/menu-configuration';
import { UserService } from '../../shared/user/shared/user.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { I18nService } from '../../shared/i18n/i18n.service';
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ]
})
export class AppRootComponent implements OnInit, OnDestroy {

  configMenu: MenuConfiguration = {
    displayLogo: false,
    displayAdminRecipe: false,
    show_page_title: true,
    urlAdmin: [],
    displayBurgerMenu: false,
    displayButtonConnection: true,
    displayIconButtonConnection: false,
    displaySearchIcon: false,
    customIconConnection: true,
    underlineTitle: false,
    displayCart: false,
    connectionBtn: {
      mat_color: 'primary',
      color: '#fff',
      background: '#90323d'
    }
  };

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
              private ccService: NgcCookieConsentService) {
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
