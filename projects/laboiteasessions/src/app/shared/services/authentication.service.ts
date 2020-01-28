import { DOCUMENT, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, from, Observable, Observer } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../interfaces/api/api-login-request';
import { RegisterRequest } from '../interfaces/api/api-register-request';
import { User } from '../interfaces/user';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  publicUrl = `${environment.middleware}/v1/public/users`;
  secureUsersUrl = `${environment.middleware}/v1/restricted/users`;

  jwt$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute,
              private storageService: StorageService,
              private router: Router,
              private http: HttpClient,
              private location: Location,
              private toastService: ToastService,
              private jwtHelperService: JwtHelperService,
              private translateService: TranslateService,
              @Inject(LOCALE_ID) private locale: string,
              @Inject(DOCUMENT) private document: any,
  ) {
    this.locale = locale.length > 2 ? locale.substr(0, 2) : locale;
  }

  /**
   * Register new user
   */
  register(user: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.publicUrl}/register`, {register: user});
  }

  /**
   * Next if user was authenticated, jwt key and user informations
   */
  getAuthentication(): Observable<User> {
    return new Observable((observer) => {
      this.getJWT()
        .pipe(timeout(1000))
        .subscribe(
          (token) => {
            const authenticated: boolean = !this.jwtHelperService.isTokenExpired(token);
            this.jwt$.next(token);
            this.authenticated$.next(authenticated);
            this.getUserStorageItem(observer);
          },
          () => {
            this.jwt$.next(null);
            this.user$.next(null);
            this.authenticated$.next(false);
            observer.next(null);
          }
        );
    });
  }

  getUserStorageItem(observer) {
    from(this.storageService.getItem('user'))
      .subscribe(
        (userString: string) => {
          let user: User = null;
          if (typeof userString === 'string') {
            try {
              user = JSON.parse(userString) as User;
            } catch (e) {
            }
          }
          this.user$.next(user);
          observer.next(user);
        }, () => {
          this.user$.next(null);
          observer.next(null);
        });
  }

  /**
   * Saves the JWT to send it with each HTTP Request
   * jwt the JSON Web Token to save
   */
  saveJWT(jwt: string): Observable<void> {
    return new Observable((observer) => {
      this.storageService
        .setItem('id_token', jwt)
        .then(() => {
            this.jwt$.next(jwt);
            observer.next();
            observer.complete();
          }, (err) => {
            observer.error(err);
            observer.complete();
          }
        )
        .catch(err => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  /**
   * gets the JWT from storage
   */
  getJWT(): Observable<string> {
    return new Observable<string>((observer) => {
      this.storageService.getItem<string>('id_token').then((token) => {
        observer.next(token);
        observer.complete();
      });
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.secureUsersUrl}/account`);
  }

  /**
   * Saves the currently logged in user
   */
  saveUser(user: User): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      this.user$.next(user);
      this.storageService
        .setItem('user', JSON.stringify(user))
        .then(
          () => {
            observer.next();
            observer.complete();
          },
          () => {
            observer.next();
            observer.complete();
          }
        )
        .catch(err => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  /**
   * Update from local to server user data
   */
  updateUser(user: User): Observable<User> {
    const url = `${this.secureUsersUrl}/account`;

    return this.http.patch<User>(url, user)
      .pipe(
        tap((updatedUser) => {
          this.saveUser(updatedUser)
            .subscribe();
        })
      );
  }

  /**
   * Déconnexion utilisateur
   */
  logout(): Observable<void> {
    return new Observable(observer => {
      Promise.all([
          this.storageService.removeItem('user'),
          this.storageService.removeItem('id_token')
        ]
      ).then(() => {
        this.user$.next(null);
        this.jwt$.next(null);
        this.authenticated$.next(false);
        observer.next();
        observer.complete();
      });
    });
  }

  /**
   * Login Authentication
   */
  loginCheck(user: LoginRequest): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.publicUrl}/login_check`, user)
      .pipe(
        tap((tokenResponse) => {
          this.storageService.setItem('id_token', tokenResponse.token).then();
        })
      );
  }
}
