import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';
import { User } from '../../shared/interfaces/user';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AppState } from '../../shared/store/app.state';
import { selectLoggedIn } from '../../shared/store/user/selectors/user.selector';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {
  user: User;
  locale: string;
  options: object;
  authenticated$: Observable<boolean>;

  constructor(private router: Router,
              private cartService: CartService,
              public authenticationService: AuthenticationService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    this.authenticated$ = this.store.select(selectLoggedIn);
  }

  logout() {
    this.authenticationService.logout().subscribe();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
