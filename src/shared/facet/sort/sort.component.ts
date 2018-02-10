import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from './../../product/product.service';

export class Sort {
  column: string;
  direction: string;
}

export class SortFacet {
  column: string;
  direction: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-facet-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Output('closeSidenav') closeSidenav: EventEmitter < boolean > = new EventEmitter < boolean > ();
  @Output('sorted') sorted: EventEmitter < Sort > = new EventEmitter < Sort > ();
  facets: SortFacet[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.facets = [{
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

  close() {
    this.closeSidenav.emit(true);
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
    this.productService.publishedFilter$.next(null);
    this.productService.orderBy$.next(sort);
  }
}
