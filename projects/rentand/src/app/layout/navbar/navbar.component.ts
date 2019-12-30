import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CartService } from '../../pages/cart/shared/cart.service';
import { User } from '../../shared/interfaces/user';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AppState } from '../../shared/store/app.state';
import { selectLoggedIn, selectUser } from '../../shared/store/user/selectors/user.selector';
import { UserState } from '../../shared/store/user/states/user.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  authenticated: boolean;

  open: boolean;

  authenticated$: Observable<boolean>;

  @Output() sideNavOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cartService: CartService,
              private authenticationService: AuthenticationService,
              private store: Store<AppState>) {
    this.open = false;
  }

  ngOnInit() {
    this.store.select(selectUser)
      .pipe(
        skipWhile((userState: UserState) => !userState.user)
      )
      .subscribe((userState: UserState) => {
        this.user = userState.user as User;
      });

    this.checkAuthenticated();
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

  checkAuthenticated() {
    this.authenticated$ = this.store.select(selectLoggedIn);
  }
}
