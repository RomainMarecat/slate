import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClothing } from './../shared/clothing/i-clothing';
import { ClothingService } from './../shared/clothing/clothing.service';
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
  ratio: string;
  user: any;

  /**
   *
   * @param {Router} router
   * @param {ClothingService} clothingService
   * @param {AlertService} alertService
   * @param {UserService} userService
   * @param {LoaderService} loaderService
   */
  constructor(private router: Router, private clothingService: ClothingService,
    public alertService: AlertService, private userService: UserService,
    private loaderService: LoaderService) {
    this.user = this.userService.getUser();
    this.ratio = '3:5';
    this.loaderService.show();
  }

  /**
   * Show loader
   */
  ngOnInit() {
    this.loaderService.hide();
  }

  /**
   * When the form is submitted, we create new product
   * And show a toast to display info
   * @param {IClothing} clothing
   */
  onClothingSubmit(clothing: IClothing) {
    this.clothingService.createClothing(clothing);
    this.alertService.toast('Votre pull est en attente de validation :)', 'info');
    this.router.navigate(['/']);
  }

  /**
   * Get the new clothing value
   * @param {IClothing} clothing
   */
  onClothingChange(clothing: IClothing) {
    this.clothing = clothing;
  }
}
