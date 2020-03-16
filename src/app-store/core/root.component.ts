import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { I18nService } from '../../shared/i18n/i18n.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MenuConfiguration } from '../../shared/menu/shared/menu-configuration';
import { ScrollService } from '../../shared/scroll/shared/scroll.service';
import { UserService } from '../../shared/user/shared/user.service';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppRootComponent implements OnInit {

  menuConfig: MenuConfiguration = {
    displayBrand: false,
    displaySpacer: true,
    displayPhoneNumber: false,
    displayLogo: true,
    showPageTitle: false,
    displayAdminRecipe: false,
    urlAdmin: ['admin'],
    displayBurgerMenu: false,
    displayButtonConnection: true,
    displayIconButtonConnection: false,
    displaySearchIcon: false,
    connectionBtn: {
      mat_color: 'primary'
    },
    customIconConnection: false,
    underlineTitle: false,
    displayCart: true
  };

  /**
   * Root Constructor
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              public userService: UserService,
              private loaderService: LoaderService,
              private i18nService: I18nService,
              private ccService: NgcCookieConsentService,
              public matIconRegistry: MatIconRegistry,
              private scrollService: ScrollService,
              private domSanitizer: DomSanitizer) {
    this.scrollService.initScroll();
    this.registerIcons();
  }

  ngOnInit() {
    this.startAnalytics();
  }

  /**
   * Start tracking with analytics2
   */
  startAnalytics() {
    this.angulartics2GoogleAnalytics.startTracking();
  }

  /**
   * Register all custom mat-icon
   */
  registerIcons() {
    this.matIconRegistry.addSvgIcon(
      `logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/icons/logo.svg`)
    );
  }
}


