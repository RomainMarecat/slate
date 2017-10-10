import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clothing } from './../shared/clothing';
import { IClothing } from './../shared/i-clothing';

@Component({
  selector: 'clothing-item',
  templateUrl: './clothing-item.component.html',
  styleUrls: ['./clothing-item.component.scss']
})
export class ClothingItemComponent implements OnInit {

  @Input('clothing') clothing: IClothing;
  @Output() updateClothing: EventEmitter<IClothing> = new EventEmitter<IClothing>();

  constructor() { }
I
  ngOnInit() {
  }

    ugly(clothing: Clothing) {
      clothing.ugly++;
      this.updateClothing.emit(clothing);
    }

    like(clothing: Clothing) {
      clothing.ugly--;
      this.updateClothing.emit(clothing);
    }

}
