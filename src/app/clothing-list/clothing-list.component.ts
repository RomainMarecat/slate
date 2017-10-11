import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClothingService } from './../shared/clothing.service';
import { Clothing } from './../shared/clothing';
import { IClothing } from './../shared/i-clothing';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'clothing-list',
  templateUrl: './clothing-list.component.html',
  styleUrls: ['./clothing-list.component.scss']
})
export class ClothingListComponent implements OnInit {
  clothes$: Observable < IClothing[] > ;

  constructor(private clothingService: ClothingService, private router: Router) {}

  ngOnInit() {
    this.clothes$ = this.clothingService.getClothes();
  }

  updateClothing(clothing: IClothing) {
    this.clothingService.updateClothing(clothing);
  }

  addClothing() {
    this.router.navigate(['/add']);
  }
}
