import { DOCUMENT, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  loginrentandUrl = `${environment.middleware}/v1/login/rentand`;
  publicSearchsUrl = `${environment.middleware}/v1/search`;
  secureUsersUrl = `${environment.middleware}/v1/secure/users`;

  currentUserEmail: string;

  auth0: any;
  user = new Subject();
  config = environment;

  redirectToSignup = new Subject<string>();
  redirectToSignup$ = this.redirectToSignup.asObservable();

  authenticationStatus = new Subject<any>();
  authenticationStatus$ = this.authenticationStatus.asObservable();

  passwordResetStatus = new Subject<any>();
  passwordResetStatus$ = this.passwordResetStatus.asObservable();

  userUpdateStatus = new Subject<any>();
  userUpdateStatus$ = this.userUpdateStatus.asObservable();

  isAuthenticatedSubject = new Subject<boolean>();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private location: Location,
              private toastService: ToastService,
              private jwtHelperService: JwtHelperService,
              private translateService: TranslateService,
              @Inject(LOCALE_ID) private locale: string,
              @Inject(DOCUMENT) private document: any,
  ) {

    this.redirectUrl = this.document.location.origin;
    const isProd = environment.production;
    this.locale = locale.length > 2 ? locale.substr(0, 2) : locale;
    if (this.locale && isProd) {
      this.redirectUrl = this.redirectUrl + '/' + this.locale;
    }
    // this.auth0 = new auth0.WebAuth({
    //  domain: this.config.domain,
    //  clientID: this.config.clientID,
    //  redirectUri: this.redirectUrl,
    //  responseType: 'code',
    //  scope: 'openid app_metadata',
    // });
  }

  loginrentand(code: string): Observable<object> {
    return this.http.get(`${this.loginrentandUrl}?code=${code}&redirect_uri=${this.redirectUrl}`);
  }

  signUprentand(firstname, lastname, email, password, params = {redirectUri: ''}) {

    // let req = this.auth0.signup({
    //   domain: this.config.domain,
    //   clientID: this.config.clientID,
    //   connection: 'Username-Password-Authentication',
    //   email: email,
    //   password: password,
    //   user_metadata: {'firstname': firstname, 'lastname': lastname}
    // }, (err, resp) => {
    //   if (resp) {
    //     this.loginCheck(email, password, {
    //       redirectUri: params.redirectUri
    //     });
    //   }
    //   this.authenticationStatus.next(err || resp);
    // });
  }

  setAuthenticationStatus(status) {
    this.isAuthenticatedSubject.next(status);
  }

  getUser(): User {
    if (typeof localStorage.getItem('user') !== 'undefined'
      && localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user')) as User;
    }

    return null;
  }


  updateUser(user: User): Observable<User> {
    const url = `${this.secureUsersUrl}/me`;

    return new Observable<User>(observer => {
      this.http.patch(url, JSON.stringify(user))
        .subscribe((res) => {
          this.updateLocalStorageUser(user);

          observer.next(user);
          observer.complete();
        });
    });
  }

  updateLocalStorageUser(user: User) {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    storageUser.user_metadata.firstname = user.user_metadata.firstname;
    storageUser.user_metadata.lastname = user.user_metadata.lastname;
    storageUser.user_metadata.phone = user.user_metadata.phone;
    storageUser.user_metadata.birthday = user.user_metadata.birthday;
    storageUser.user_metadata.gender = user.user_metadata.gender;
    storageUser.user_metadata.nationality = user.user_metadata.nationality;
    storageUser.user_metadata.address = user.user_metadata.address;
    storageUser.user_metadata.languages = user.user_metadata.languages;
    storageUser.user_metadata.mother_lang = user.user_metadata.mother_lang;
    localStorage.setItem('user', JSON.stringify(storageUser));
  }

  saveJwtToken(objectToken: any) {
    if (objectToken
      && objectToken.token
      && objectToken.token.id_token
      && objectToken.token.access_token
      && objectToken.data) {
      localStorage.setItem('id_token', objectToken.token.id_token);
      localStorage.setItem('access_token', objectToken.token.access_token);
      localStorage.setItem('user', JSON.stringify(objectToken.data as User));

      this.auth0.client.userInfo(objectToken.token.access_token, (error, user) => {
        if (error) {
          this.toastService.emitToast({message: error, classes: 'red'});
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
      });
    }
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('id_token') && this.jwtHelperService.isTokenExpired('id_token');
  }

  logout() {

    this.setAuthenticationStatus(false);

    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

  }

  isStructureAccount(): boolean {
    const user = this.getUser();
    return (user && user.app_metadata
      && user.app_metadata.rentand
      && user.app_metadata.rentand.structure === true);
  }

  isProAccount(): boolean {
    const user = this.getUser();
    return (user && user.app_metadata
      && user.app_metadata.rentand
      && user.app_metadata.rentand.mono === true);
  }

  loginCheck(email: string, password: string, params = {redirectUri: ''}): any {

    this.currentUserEmail = email;

    if (this.auth0) {
      if (params.redirectUri) {
        const redirectUrl = params.redirectUri ? (window.location.origin + '?redirect_to=' + params.redirectUri) : '';
        this.auth0.redirect.loginWithCredentials(
          {
            connection: 'Username-Password-Authentication',
            username: email,
            password,
            scope: 'openid app_metadata',
            redirect_uri: redirectUrl
          }, error => {
            this.handleLoginError(error);
          });
      } else {
        this.auth0.redirect.loginWithCredentials(
          {
            connection: 'Username-Password-Authentication',
            username: email,
            password,
            scope: 'openid app_metadata'
          }, error => {
            this.handleLoginError(error);
          });
      }
    }
  }

  handleLoginError(error) {
    if (error.statusCode === 401) {
      this.isUserExisting(this.currentUserEmail).then((resp) => {
        if (resp._body === 'false') {
          this.redirectToSignup.next(this.currentUserEmail);
        } else {
          this.authenticationStatus.next(error);
        }
      }).catch((err) => {
        this.authenticationStatus.next(error);
      });
    } else {
      this.authenticationStatus.next(error);
    }
  }

  isUserExisting(email: string): Promise<any> {
    const url = `${this.publicSearchsUrl}/user/` + email;
    return this.http
      .get(url)
      .toPromise();
  }

  loginWithFacebook(params = {redirectUrl: '/'}): void {
    this.auth0.authorize({
      connection: 'facebook-oauth2',
      redirect_uri: this.router.url
    });
  }

  loginWithGoogle(params = {redirectUri: ''}): void {
    const redirectUrl = params.redirectUri ? (window.location.origin + '?redirect_to=' + params.redirectUri) : '';
    if (this.auth0) {
      this.auth0.authorize({
        connection: 'google-oauth2',
        redirect_uri: redirectUrl,
      }, (resp) => {
      });
    }
  }

  changePassword(email) {
    this.auth0.changePassword({
      connection: 'Username-Password-Authentication',
      email
    }, (err, resp) => {
      if (err) {
        this.passwordResetStatus.next(err);
      } else {
        this.passwordResetStatus.next(resp);
      }
    });
  }
}
