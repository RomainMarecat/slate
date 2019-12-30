import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AppState } from '../../shared/store/app.state';
import { selectLoggedIn, selectUser } from '../../shared/store/user/selectors/user.selector';
import { SecurityMessage } from './security-message';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityComponent implements OnInit {

  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter();
  @Output() userLoggedOut: EventEmitter<any> = new EventEmitter();

  user: User;
  currentRoute = '/secure/login';
  authenticated$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.getUser();
    this.checkAuthenticated();
  }

  getUser() {
    this.store.select(selectUser)
      .subscribe((userState) => {
        this.user = userState.user as User;
      });
  }

  checkAuthenticated() {
    this.authenticated$ = this.store.select(selectLoggedIn);
  }

  logout() {
    this.authenticationService.logout();
    this.userLoggedOut.emit();
    window.location.href = this.router.url;
  }

  changeRoute(event) {
    if (event.index === 1) {
      history.pushState(null, 'Signup', '/secure/signup');
      this.currentRoute = '/secure/signup';
    } else {
      history.pushState(null, 'Login', '/secure/login');
      this.currentRoute = '/secure/login';
    }
  }

  openSnackBar(securityMesssage: SecurityMessage) {

    const snackBarRef = this.snackBar.open(
      securityMesssage.msg,
      securityMesssage.action, {
        duration: securityMesssage.duration || 5000,
        panelClass: securityMesssage.classes || ['orange']
      });


    snackBarRef.afterDismissed().subscribe(() => {
      if (securityMesssage.redirectTo) {
        this.router.navigate([securityMesssage.redirectTo]);
      }
    });

    snackBarRef.onAction().subscribe(() => {
      if (securityMesssage.redirectTo) {
        this.router.navigate([securityMesssage.redirectTo]);
      }
    });
  }

  redirectToSignup(email) {
    this.currentRoute = '/secure/signup';
    this.openSnackBar({
      msg: this.translateService.instant('signup.redirected_to_signup'),
      action: 'OK'
    });
  }
}
