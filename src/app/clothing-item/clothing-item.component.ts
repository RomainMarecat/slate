import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Clothing } from './../shared/clothing/clothing';
import { IClothing } from './../shared/clothing/i-clothing';

@Component({
  selector: 'app-clothing-item',
  templateUrl: './clothing-item.component.html',
  styleUrls: ['./clothing-item.component.scss']
})
export class ClothingItemComponent implements OnInit {

  _clothing: IClothing;
  @Output() updateClothing: EventEmitter < IClothing > = new EventEmitter < IClothing > ();
  cols: number;
  resizedImage = { height: "100", width: "100" };

  constructor(private router: Router) {
    this.cols = 0;
  }

  ngOnInit() {}

  ugly(clothing: IClothing) {
    clothing.score++;
    this.updateClothing.emit(clothing);
  }

  like(clothing: IClothing) {
    clothing.score--;
    this.updateClothing.emit(clothing);
  }

  get clothing() {
    return this._clothing;
  }

  @Input() set clothing(clothing) {
    this._clothing = clothing;
    if (this._clothing.image1) {
      this.cols++;
    }
    if (this._clothing.image2) {
      this.cols++;
    }
    if (this._clothing.image3) {
      this.cols++;
    }
  }

  clothingDetail() {
    this.router.navigate(['/detail', this.clothing.name])
  }
}
