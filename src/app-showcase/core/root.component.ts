import { Component, OnDestroy, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { I18nService } from '../../shared/i18n/i18n.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MenuConfiguration } from '../../shared/menu/shared/menu-configuration';
import { UserService } from '../../shared/user/shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppRootComponent implements OnInit, OnDestroy {

  configMenu: MenuConfiguration = {
    displayLogo: false,
    displayAdminRecipe: false,
    show_page_title: true,
    urlAdmin: [],
    displayBurgerMenu: false,
    displayButtonConnection: false,
    displayIconButtonConnection: false,
    displaySearchIcon: false,
    customIconConnection: false,
    underlineTitle: false,
    displayCart: false,
    connectionBtn: {
      mat_color: 'primary',
      color: '#fff',
      background: '#90323d'
    }
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
              private i18nService: I18nService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
