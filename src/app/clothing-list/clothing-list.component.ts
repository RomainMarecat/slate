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

  ngOnInit() {
    this.loaderService.show();
    this.meta.addTags([
      { name: 'title', content: 'Mon pull Moche' },
      { property: 'og:title', content: '' },
      { name: 'description', content: 'Découvrez la liste officielle des pulls moches.' },
    ]);

    this.loadClothes(this.pageLimit);
    this.loaderService.hide();
  }

  updateClothing(clothing: IClothing) {
    this.clothingService.updateClothing(clothing);
  }

  addClothing() {
    this.router.navigate(['/add']);
  }

  loadClothes(limit: number) {
    this.clothingService.keyFilters$.next(null);
    this.clothingService.nameFilters$.next(null);
    this.clothingService.publishedFilter$.next(true);
    this.clothes$ = this.clothingService.getClothes();
  }
}
