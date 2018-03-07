import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ]
})
export class CardComponent implements OnInit {

  now = new Date();
  colors: string[] = [
    'Red',
    'Blue',
    'White',
    'Black',
    'Yellow',
    'Green'
  ];

  seasons: string[] = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
