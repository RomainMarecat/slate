import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.clear();
      }
    }, (err) => {
      this.clear();


    });
  }

  getUser(): User {
    return this.afAuth.auth.currentUser as User;
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null;
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
