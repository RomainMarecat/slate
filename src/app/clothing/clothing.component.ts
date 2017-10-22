import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-clothing-index',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss']
})
export class ClothingComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}

  ngOnInit() {}

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
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

}
