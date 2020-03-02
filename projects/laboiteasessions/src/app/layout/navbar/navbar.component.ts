import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CartService } from '../../shared/services/cart.service';
import { User } from '../../shared/interfaces/user';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AppState } from '../../shared/store/app.state';
import { selectLoggedIn, selectUser } from '../../shared/store/user/selectors/user.selector';
import { UserState } from '../../shared/store/user/states/user.state';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  authenticated: boolean;

  open: boolean;

  @Input() displayLogo: boolean;

  authenticated$: Observable<boolean>;

  @Output() sideNavOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cartService: CartService,
              private authenticationService: AuthenticationService,
              private router: Router,
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
    this.checkRouterLogo();
  }

  checkRouterLogo() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.displayLogo = routerEvent.url !== '/';
      }
    });
  }

  toggleSideNav() {
    this.sideNavOpen.emit(!this.open);
  }

  checkAuthenticated() {
    this.authenticated$ = this.store.select(selectLoggedIn);
  }
}
