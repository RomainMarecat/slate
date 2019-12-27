import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../pages/cart/shared/cart.service';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  authenticated: boolean;

  open: boolean;

  @Output() sideNavOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cartService: CartService,
              private authService: AuthService) {
    this.open = false;
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getUser();
  }

  toggleSideNav() {
    this.sideNavOpen.emit(!this.open);
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

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
