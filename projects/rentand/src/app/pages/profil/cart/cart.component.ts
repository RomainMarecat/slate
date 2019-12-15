import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  direction = 'left';
  open = false;
  animationMode = 'fling';
  fixed = true;

  constructor() {}

  ngOnInit() {}

  toggleOpen() {
    this.open = !this.open;
  }

  addToCart() {

  }

  action1() {

  }

  action2() {

  }

  action3() {

  }
}
