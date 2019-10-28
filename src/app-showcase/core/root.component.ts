import { Component } from '@angular/core';
import { MenuConfiguration } from '../../shared/menu/shared/menu-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppRootComponent {

  configMenu: MenuConfiguration = {
    displayBrand: true,
    displaySpacer: false,
    displayPhoneNumber: true,
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
}
