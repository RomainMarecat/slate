import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clothing } from './../shared/clothing/clothing';
import { IClothing } from './../shared/clothing/i-clothing';
import { ClothingService } from './../shared/clothing/clothing.service';
import { User } from './../shared/user/user';
import { UserService } from './../shared/user/user.service';
import { LoaderService } from './../shared/loader/loader.service';
import { AlertService } from './../shared/alert/alert.service';

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

  constructor(private router: Router, private clothingService: ClothingService,
    public alertService: AlertService, private userService: UserService,
    private loaderService: LoaderService) {
    this.user = this.userService.getUser();
    this.ratio = '3:5';
    this.loaderService.show();
  }

  ngOnInit() {
    this.loaderService.hide();
  }

  onClothingSubmit(clothing: IClothing) {
    this.clothingService.createClothing(clothing);
    this.alertService.toast('Votre pull est en attente de validation :)', 'info');
    this.router.navigate(['/']);
  }

  onClothingChange(clothing: IClothing) {
    this.clothing = clothing;
  }
}
