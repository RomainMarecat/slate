import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from './user';
import { map, take, tap, timeout } from 'rxjs/operators';
import { AlertService } from '../../popup/alert.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {
  authorized: string[] = [];

  constructor(private afAuth: AngularFireAuth, private alertService: AlertService) {
    this.authorized.push('6glT4N2SUMW2HWibhefumuRiVIh2');
    this.authorized.push('oIAtyPwagRfIKxSwX6O3ncGocyD3');
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.clear();
      }
    }, () => {
      this.clear();
    });
  }

  isAdmin(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        timeout(5000),
        take(1),
        map(authState => {
          return authState && this.authorized.includes(authState.uid);
        }),
        tap(authenticated => {
          if (!authenticated) {
            return false;
          }
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        timeout(5000),
        take(1),
        map(authState => !!authState),
        tap(authenticated => {
          if (!authenticated) {
            this.alertService.toast('user.access_denied.connect');
          }
        })
      );
  }

  getUser(): User {
    return this.afAuth.auth.currentUser as User;
  }

  getLoginGoogle(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  getLoginRedirectGoogle(): Promise<any> {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    return this.afAuth.auth.getRedirectResult();
  }

  loginGoogle() {
    this.getLoginRedirectGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }, (err: HttpErrorResponse) => {
        this.alertService.show(err.error);
      }).catch((err) => {
      this.alertService.show(err.message);
    });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {
        const user = result.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }, (err: HttpErrorResponse) => {
        this.alertService.show(err.error);
      }).catch((err) => {
      this.alertService.show(err.message);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.clear();
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  clear() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getAuthState(): Observable<User> {
    return this.afAuth.authState;
  }
}
