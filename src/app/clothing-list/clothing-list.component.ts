import { Component, OnInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClothingService } from './../shared/clothing/clothing.service';
import { Clothing } from './../shared/clothing/clothing';
import { IClothing } from './../shared/clothing/i-clothing';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../shared/user/user.service';
import { AlertService } from './../shared/alert/alert.service';
import { LoaderService } from './../shared/loader/loader.service';

@Component({
  selector: 'app-clothing-list',
  templateUrl: './clothing-list.component.html',
  styleUrls: ['./clothing-list.component.scss']
})
export class ClothingListComponent implements OnInit {
  // Products collection of Clothing interface
  clothes$: Observable < IClothing[] > ;
  clothes: Array < IClothing > ;
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;

  constructor(private clothingService: ClothingService, private router: Router,
    private meta: Meta, private clothingComponent: ElementRef,
    private userService: UserService, public alertService: AlertService,
    private loaderService: LoaderService) {
    this.headerHeight = 0;
    this.pageLimit = 20;
    this.rowHeight = 300;
  }

  /**
   * Show loader and Add meta tags
   * Diplay All products index by published at
   */
  ngOnInit() {
    this.loaderService.show();
    this.meta.addTags([
      { name: 'title', content: 'Mon pull Moche' },
      { name: 'description', content: 'Découvrez la liste officielle des pulls moches.' },
    ]);

    this.loadClothes(this.pageLimit);
  }

  /**
   * Update on product
   * @param {IClothing} clothing
   */
  updateClothing(clothing: IClothing) {
    this.clothingService.updateClothing(clothing);
  }

  /**
   * Go to form page Add product
   */
  addClothing() {
    this.router.navigate(['/add']);
  }

  /**
   * Load Products with current limit
   * @param {number} limit
   */
  loadClothes(limit: number) {
    this.clothingService.keyFilters$.next(null);
    this.clothingService.nameFilters$.next(null);
    this.clothingService.publishedFilter$.next(true);
    this.clothes$ = this.clothingService.getClothes();
    this.loaderService.hide();
  }
}
