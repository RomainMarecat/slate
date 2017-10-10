import { Component, OnInit } from '@angular/core';
import { ClothingService } from './../shared/clothing.service';
import { Clothing } from './../shared/clothing';
import { IClothing } from './../shared/i-clothing';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'clothing-list',
  templateUrl: './clothing-list.component.html',
  styleUrls: ['./clothing-list.component.scss']
})
export class ClothingListComponent implements OnInit {
  clothes$: Observable<IClothing[]>;

  constructor(private clothingService: ClothingService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.clothes$ = this.clothingService.getClothes();
  }

  updateClothing(clothing: IClothing) {
    this.clothingService.updateClothing(clothing);
  }

  addClothing() {

  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
