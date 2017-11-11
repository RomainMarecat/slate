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
  @Output() updatedClothing: EventEmitter < IClothing > = new EventEmitter < IClothing > ();
  cols: number;
  resizedImage: any;

  constructor(private router: Router) {
    // Add columns number for each images max < 4
    this.cols = 0;
    // Display fixed images for item view
    this.resizedImage = { height: '240', width: '240' };
  }

  ngOnInit() {}

  /**
   * Getter for product
   */
  get clothing() {
    return this._clothing;
  }

  /**
   * Product binding and auto resize columns
   * @param IClothing clothing
   */
  @Input() set clothing(clothing: IClothing) {
    this._clothing = clothing;
    this.countCols();
  }

  /**
   * Update a new score from a new score event
   * @param {IClothing} clothing
   */
  updateScoreClothing(clothing: IClothing) {
    this.updatedClothing.emit(clothing);
  }

  /**
   * Go to product page detail
   */
  clothingDetail() {
    this.router.navigate(['/detail', this.clothing.key + '-' + this.clothing.name]);
  }

  /**
   * Count columns for each image in IClothing type
   */
  countCols() {
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
}
