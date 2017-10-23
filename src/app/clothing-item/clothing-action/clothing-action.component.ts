import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Clothing } from './../../shared/clothing/clothing';
import { IClothing } from './../../shared/clothing/i-clothing';

@Component({
  selector: 'app-clothing-action',
  templateUrl: './clothing-action.component.html',
  styleUrls: ['./clothing-action.component.scss']
})
export class ClothingActionComponent implements OnInit {

  @Input() clothing: Clothing;
  @Output() updateScore: EventEmitter < IClothing > = new EventEmitter < IClothing > ();

  constructor() {}

  ngOnInit() {}


  ugly(clothing: IClothing) {
    clothing.score++;
    this.updateScore.emit(clothing);
  }

  like(clothing: IClothing) {
    clothing.score--;
    this.updateScore.emit(clothing);
  }
}
