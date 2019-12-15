import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService) {

    this.user = this.authService.getUser() as User;

    authService.redirectToSignup$.subscribe(
      email => {
        this.redirectToSignup(email);
      });

    authService.authenticationStatus$.subscribe(
      response => {
        if (response) {
          let msg = '';
          if (response.code) { // if there is a code: it's an error (bad conception, the object should be defined as a specific class..).)
            switch (response.code) {
              case 'user_exists':
                msg = this.translateService.instant('signup.user_exists');
                break;
              case 'invalid_user_password':
                msg = this.translateService.instant('login.wrong_email_or_password');
                break;
              default:
                msg = response.description;
                break;
            }
            this.openSnackBar({
              msg,
              action: 'ok',
              classes: ['red']
            });
          } else { // else, it's a good news ! We notify and redirect
            this.openSnackBar({
              msg: this.translateService.instant('signup.signup_succesful'),
              action: 'OK',
              classes: ['green']
            });
          }
        }
      }
    );

    authService.passwordResetStatus$.subscribe(
      msg => {
        this.openSnackBar({
          msg: this.translateService.instant('login.password_email_sent'),
          action: 'OK',
          classes: ['green']
        });
      }
    );
  }

  ngOnInit() {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle({
      redirectUri: this.router.url === ('/secure/login' || '/secure/signup') ? '/' :
        this.router.url.substr(1, this.router.url.length)
    });
    this.userLoggedIn.emit();
  }

  logout() {
    this.authService.logout();
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
