import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map, take, tap, timeout } from 'rxjs/operators';
import { AlertService } from '../../popup/alert.service';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@firebase/auth-types';
import { Cart } from '../../cart/shared/cart';

@Injectable()
export class UserService {
  authorized: string[] = [];

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

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
        map(authState => !!authState)
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
          try {
            localStorage.setItem('user', JSON.stringify(user));
          } catch (e) {
          }
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
          try {
            localStorage.setItem('user', JSON.stringify(user));
          } catch (e) {
          }
        }
      }, (err: HttpErrorResponse) => {
        this.alertService.show(err.error);
      }).catch((err) => {
      this.alertService.show(err.message);
    });
  }

  logout(): Observable<void> {
    return from(this.afAuth.auth.signOut())
      .pipe(
        timeout(5000),
        tap(() => this.clear())
      );
  }

  clear() {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (e) {
    }
  }

  getAuthStateUser(): Observable<User> {
    return new Observable((observer) => {
      const userSubscription: Subscription = this.getAuthState()
        .pipe(
          timeout(10000)
        )
        .subscribe((user: User) => {
            if (user) {
              this.user$.next(user);
              observer.next(user);
              observer.complete();
              return;
            }

            observer.next(null);
            observer.complete();

            if (userSubscription) {
              userSubscription.unsubscribe();
            }
          },
          (err) => {
            observer.error(err);
            observer.complete();
          });
    });

  }

  getAuthState(): Observable<User> {
    return this.afAuth.authState;
  }

  getCurrentUser(): Observable<User> {
    return this.afAuth.user;
  }

  updateProfile(user: User, profile: {
    displayName: string | null;
    photoURL: string | null;
  }): Observable<void> {
    return from(user.updateProfile(profile));
  }
}
