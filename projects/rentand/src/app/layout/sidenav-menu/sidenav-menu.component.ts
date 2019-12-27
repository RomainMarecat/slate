import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../pages/cart/shared/cart.service';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent {
  user: User;
  locale: string;
  options: object;

  constructor(private router: Router,
              private cartService: CartService,
              public authService: AuthService) {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  openCart() {
    this.cartService.emitOpenCart();
  }

  isCartEmpty(): boolean {
    return this.cartService.getCartItemNumber() === 0;
  }

  getCartItemsNumber(): number {
    return this.cartService.getCartItemNumber();
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
