export interface MenuConfiguration {
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
  show_page_title: boolean;
  connectionBtn?: {
    color?: string;
    background?: string;
    mat_color?: string;
  };
}
