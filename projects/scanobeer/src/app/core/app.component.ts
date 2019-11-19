import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { I18nService } from '../../../../../src/shared/i18n/i18n.service';
import { LoaderService } from '../../../../../src/shared/loader/loader.service';
import { MenuConfiguration } from '../../../../../src/shared/menu/shared/menu-configuration';
import { ScrollService } from '../../../../../src/shared/scroll/shared/scroll.service';
import { UserService } from '../../../../../src/shared/user/shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  configMenu: MenuConfiguration = {
    displayBrand: false,
    displaySpacer: true,
    displayPhoneNumber: false,
    displayLogo: true,
    showPageTitle: false,
    displayAdminRecipe: false,
    urlAdmin: [],
    displayBurgerMenu: true,
    displayButtonConnection: true,
    displayIconButtonConnection: true,
    displaySearchIcon: false,
    connectionBtn: {
      mat_color: 'primary'
    },
    customIconConnection: false,
    underlineTitle: false,
    displayCart: false
  };

  configFooter = {
    displayFooter: false,
    displayTopButton: false,
    displayLinks: false,
    displaySublinks: false
  };

  /**
   * Root Constructor
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              public userService: UserService,
              private loaderService: LoaderService,
              private i18nService: I18nService,
              private scrollService: ScrollService) {
    this.scrollService.initScroll();
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
}
