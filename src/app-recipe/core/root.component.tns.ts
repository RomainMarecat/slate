import { Component, OnInit } from '@angular/core';

const firebase = require('nativescript-plugin-firebase');

@Component({
  selector: 'app-root',
  templateUrl: './root.component.tns.html',
})

export class AppRootComponent implements OnInit {

  async ngOnInit(): Promise<void> {
    try {
      await firebase.init({
        persist: false
      });
    } catch (err) {
      console.error('Firebase init error: ' + err);
    }
  }
}
