import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from './../../product/product.service';

export class Filter {
  column: string;
  operator: string;
  value: string;
}


export class FilterFacet {
  column: string;
  operator: string;
  value: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-facet-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output('closeSidenav') closeSidenav: EventEmitter < boolean > = new EventEmitter < boolean > ();
  @Output('filtered') filtered: EventEmitter < Filter > = new EventEmitter < Filter > ();
  facets: FilterFacet[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.facets = [{
      name: 'Catégorie',
      column: 'category',
      operator: '==',
      value: '',
      selected: true
    }, {
      name: 'Prix',
      column: 'price',
      operator: '==',
      value: '',
      selected: false
    }, {
      name: 'Marque',
      column: 'brand',
      operator: '==',
      value: '',
      selected: false
    }, {
      name: 'Taille',
      column: 'size',
      operator: '==',
      value: '',
      selected: false
    }];
  }

  close() {
    this.closeSidenav.emit(true);
  }

  onFilter(filter: Filter, index: number) {
    this.filtered.emit(filter);
    this.facets = this.facets.map((facet, i) => {
      facet.selected = false;
      if (index === i) {
        facet.selected = true;
      }
      return facet;
    });
    this.productService.publishedFilter$.next(null);
    this.productService.filter$.next(filter);
  }
}
