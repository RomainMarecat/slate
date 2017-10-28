import { Component, OnInit } from '@angular/core';
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
  constructor(private clothingService: ClothingService, private activeRoute: ActivatedRoute) {
    this.cols = 0;
  }

  ngOnInit() {
    this.clothingService.getClothing(this.activeRoute.params['key'])
      .subscribe((clothes: IClothing[]) => {
        this.clothing = clothes[0];
        this.countCols();
      });
  }

  countCols() {
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
