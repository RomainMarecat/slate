import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { map, take } from 'rxjs/operators';
import { AlertService } from 'shared/popup/alert.service';

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
    }, (err) => {
      this.clear();
    });
  }

  isAdmin(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        take(1),
        map(authState => {
          return authState && this.authorized.includes(authState.uid);
        })
      )
      .do(authenticated => {
        if (!authenticated) {
          return false;
        }
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        take(1),
        map(authState => !!authState)
      )
      .do(authenticated => {
        if (!authenticated) {
          this.alertService.toast('user.access_denied.connect');
        }
      });
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
      }, (err) => {
        this.alertService.show(err);
      });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {
        const user = result.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }, (err) => {
        this.alertService.show(err);
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
