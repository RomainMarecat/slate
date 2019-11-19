export interface MenuConfiguration {
  displayBrand: boolean;
  displaySpacer: boolean;
  displayPhoneNumber: boolean;
  displayLogo: boolean;
  displayAdminRecipe: boolean;
  urlAdmin: string[];
  displayBurgerMenu: boolean;
  displayButtonConnection: boolean;
  displayIconButtonConnection: boolean;
  customIconConnection: boolean;
  displaySearchIcon: boolean;
  underlineTitle: boolean;
  displayCart: boolean;
  showPageTitle: boolean;
  connectionBtn?: {
    color?: string;
    background?: string;
    mat_color?: string;
  };
}
