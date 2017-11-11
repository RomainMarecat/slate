import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClothingService } from './../shared/clothing/clothing.service';
import { IClothing } from './../shared/clothing/i-clothing';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-clothing-detail',
  templateUrl: './clothing-detail.component.html',
  styleUrls: ['./clothing-detail.component.scss']
})
export class ClothingDetailComponent implements OnInit {
  clothing: IClothing;
  cols: number;
  @Output() updatedClothing: EventEmitter < IClothing > = new EventEmitter < IClothing > ();
  resizedImage = {
    height: 300,
    width: 500
  };

  constructor(private clothingService: ClothingService, private activeRoute: ActivatedRoute) {
    this.cols = 0;
  }

  /**
   * Subscribe on value return by route nav and get unique identified by product key
   */
  ngOnInit() {
    this.activeRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        this.clothingService.getClothing(key)
          .subscribe((clothes: IClothing[]) => {
            clothes.forEach(clothing => this.clothing = clothing);
            this.countCols();
          });
      }
    });
  }

  /**
   * Dynamic count columns for clothing image
   */
  countCols() {
    if (this.clothing) {
      if (this.clothing.image1) {
        this.cols++;
      }
      if (this.clothing.image2) {
        this.cols++;
      }
      if (this.clothing.image3) {
        this.cols++;
      }
    }

  }

  /**
   * Update current score for the product
   * @param {IClothing} clothing
   */
  updateScoreClothing(clothing: IClothing) {
    this.updatedClothing.emit(clothing);
  }

}
