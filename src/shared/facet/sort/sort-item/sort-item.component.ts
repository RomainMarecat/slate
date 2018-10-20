import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SortFacet } from './../shared/sort-facet';
import { Sort } from './../shared/sort';
import { ProductService } from '../../../product/shared/product.service';

@Component({
  selector: 'app-facet-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.scss']
})
export class SortItemComponent implements OnInit {
  facets: SortFacet[];
  @Output() sorted: EventEmitter<Sort> = new EventEmitter<Sort>();

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.facets = this.getFacets();
  }

  onSort(sort: Sort, index: number) {
    this.sorted.emit(sort);
    this.facets = this.facets.map((facet, i) => {
      facet.selected = false;
      if (index === i) {
        facet.selected = true;
      }
      return facet;
    });
    this.productService.filters$.next(null);
    this.productService.orderBy$.next(sort);
  }

  getFacets() {
    return [{
      name: 'Pertinence',
      column: 'revelance',
      direction: 'asc',
      selected: true
    }, {
      name: 'Prix : les moins chers',
      column: 'price',
      direction: 'asc',
      selected: false
    }, {
      name: 'Prix : les plus chers',
      column: 'price',
      direction: 'desc',
      selected: false
    }, {
      name: 'Prix : En promotion',
      column: 'promo',
      direction: 'asc',
      selected: false
    }, {
      name: 'Les Nouveaux produits',
      column: 'published_at',
      direction: 'desc',
      selected: false
    }, {
      name: 'Les produits les plus proches',
      column: 'country',
      direction: 'asc',
      selected: false
    }];
  }

}
