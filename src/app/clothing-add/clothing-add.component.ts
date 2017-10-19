import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clothing } from './../shared/clothing/clothing';
import { IClothing } from './../shared/clothing/i-clothing';
import { ClothingService } from './../shared/clothing/clothing.service';
import { User } from './../shared/user/user';

@Component({
  selector: 'app-clothing-add',
  templateUrl: './clothing-add.component.html',
  styleUrls: ['./clothing-add.component.scss']
})
export class ClothingAddComponent implements OnInit {
  clothing: IClothing;
  thumbnail: string;
  ratio: string;
  user: any;

  constructor(private router: Router, private clothingService: ClothingService) {
    this.user = localStorage.getItem('user');
    this.ratio = '3:5';
  }

  ngOnInit() {}

  onClothingSubmit(clothing: IClothing) {
    this.clothingService.createClothing(clothing);
    this.router.navigate(['/']);
  }

  onClothingChange(clothing: IClothing) {
    this.clothing = clothing;
  }
}
