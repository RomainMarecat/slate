import { Component, OnInit, ElementRef } from '@angular/core';
import { IClothing } from './../../../shared/clothing/i-clothing';
import { ClothingService } from './../../../shared/clothing/clothing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  // Les colonnes du tableau datatable
  columns: any;
  pageLimit = 20;
  clothes$: Observable < IClothing[] > ;
  isLoading = false;

  constructor(private table: ElementRef, private clothingService: ClothingService) {
    this.columns = [{
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'description',
      name: 'description',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, ];
  }

  ngOnInit() {
    this.clothes$ = this.clothingService.getClothes();
    /*    this.onScroll(0);
     */
  }

  /**
   * onScroll Au scroll vertical, Affichage de la suite de résultats
   * @param {number} offsetY
   */
  onScroll(offsetY: number) {

    this.clothes$.subscribe((clothes: Array < IClothing > ) => {
      // total height of all orders in the viewport
      const viewHeight = this.table.nativeElement.getBoundingClientRect().height - this.headerHeight;

      // check if we scrolled to the end of the viewport;
      if (!this.isLoading && offsetY + viewHeight + 50 >= clothes.length * this.rowHeight) {

        // total number of results to load
        let limit = this.pageLimit;

        // check if we haven't fetched any results yet
        if (clothes.length === 0) {

          // calculate the number of orders that fit within viewport
          const pageSize = Math.ceil(viewHeight / this.rowHeight);

          // change the limit to pageSize such that we fill the first page entirely
          // (otherwise, we won't be able to scroll past it)
          limit = Math.max(pageSize, this.pageLimit);
        }
        this.clothingService.limit$.next(this.pageLimit);
      }
    });
  }
}
