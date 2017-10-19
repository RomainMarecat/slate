import { Component, OnInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClothingService } from './../shared/clothing/clothing.service';
import { Clothing } from './../shared/clothing/clothing';
import { IClothing } from './../shared/clothing/i-clothing';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-clothing-list',
  templateUrl: './clothing-list.component.html',
  styleUrls: ['./clothing-list.component.scss']
})
export class ClothingListComponent implements OnInit {
  clothes$: Observable < IClothing[] > ;
  clothes: Array < IClothing > ;
  isLoading: boolean;
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;

  constructor(private clothingService: ClothingService, private router: Router,
    private meta: Meta, private clothingComponent: ElementRef) {
    this.isLoading = true;
    this.headerHeight = 0;
    this.pageLimit = 20;
    this.rowHeight = 300;
  }

  ngOnInit() {
    this.isLoading = false;
    this.meta.addTags([
      { name: 'title', content: 'Mon pull Moche' },
      { property: 'og:title', content: '' },
      { name: 'description', content: 'Découvrez la liste officielle des pulls moches.' },
    ]);

    this.loadClothes(this.pageLimit);
  }

  updateClothing(clothing: IClothing) {
    this.clothingService.updateClothing(clothing);
  }

  addClothing() {
    this.router.navigate(['/add']);
  }

  /**
   * onScroll Au scroll vertical, Affichage de la suite de résultats
   * @param {number} offsetY
   */
  onScroll(offsetY: number) {
    // total height of all orders in the viewport
    const viewHeight = this.clothingComponent.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport;
    if (!this.isLoading && offsetY + viewHeight + 50 >= this.clothes.length * this.rowHeight) {

      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.clothes.length === 0) {

        // calculate the number of orders that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      this.loadClothes(limit);
    }
  }

  loadClothes(limit: number) {
    this.clothes$ = this.clothingService.getClothes();
    this.clothes$.subscribe((clothes: Array < Clothing > ) => {
      this.clothes = clothes;
    });
  }
}
