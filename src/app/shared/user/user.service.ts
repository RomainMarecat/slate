import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { AlertService } from './../alert/alert.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth, private alertService: AlertService) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.clear();
      }
    }, (err) => {
      this.clear();
    });
  }

  isAuthenticated(): Observable < boolean > {
    return this.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.alertService.toast('Il faut se connecter pour effectuer cette action');
        }
      });
  }

  getUser(): User {
    return this.afAuth.auth.currentUser as User;
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        const user = result.user;
        if (user) {
          localStorage.setItem('user', user);
        }
      }, (err) => {
        console.error(err);
      });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((result) => {
        const user = result.user;
        if (user) {
          localStorage.setItem('user', user);
        }
      }, (err) => {
        console.error(err);
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(function() {
      this.clear();
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  clear() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getAuthState(): Observable < User > {
    return this.afAuth.authState;
  }
}
