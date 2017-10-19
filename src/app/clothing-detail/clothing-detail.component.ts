import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClothingService } from './../shared/clothing/clothing.service';
import { IClothing } from './../shared/clothing/i-clothing';

@Component({
  selector: 'app-clothing-detail',
  templateUrl: './clothing-detail.component.html',
  styleUrls: ['./clothing-detail.component.scss']
})
export class ClothingDetailComponent implements OnInit {
  clothing: IClothing;

  constructor(private clothingService: ClothingService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    /*    this.clothing = this.clothingService.getClothing(this.activeRoute.params['key']);
     */
  }

}
