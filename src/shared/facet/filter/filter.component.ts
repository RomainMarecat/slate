import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../product/shared/product.service';
import { Filter } from './shared/filter';
import { FilterFacet } from './shared/filter-facet';

@Component({
  selector: 'app-facet-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() closeSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filtered: EventEmitter<Array<Filter>> = new EventEmitter<Array<Filter>>();
  facets: FilterFacet[];
  filters: Array<Filter> = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.facets = [
      // {
      //   name: 'Catégorie',
      //   column: 'category',
      //   operator: '==',
      //   value: '',
      //   selected: true
      // },
      {
        name: 'Les produits les plus vendus',
        column: 'best-seller',
        operator: '==',
        value: '',
        selected: false
      }, {
        name: 'Les produits les mieux notés',
        column: 'best-score',
        operator: '==',
        value: '',
        selected: false
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
      },
      // {
      //   name: 'Attributs',
      //   column: 'attribute',
      //   operator: '==',
      //   value: '',
      //   selected: false
      // },
      {
        name: 'Rechercher dans la descripion',
        column: 'description',
        operator: '==',
        value: '',
        selected: false
      }, {
        name: 'Pays',
        column: 'country',
        operator: '==',
        value: '',
        selected: false
      }, {
        name: 'Près de chez moi',
        column: 'location',
        operator: '==',
        value: '',
        selected: false
      }, {
        name: 'Mode de livraison',
        column: 'delivery',
        operator: '==',
        value: '',
        selected: false
      }
    ];
  }

  close() {
    this.closeSidenav.emit(true);
  }

  validate() {
    this.productService.filters$.next(null);
    this.productService.filters$.next(this.filters);
    this.filtered.emit(this.filters);

    this.close();
  }

  onFilter(filter: Filter) {
    if (filter) {
      this.filters.push(filter);
    }
  }

  reset() {
    this.filters = [];
    this.productService.filters$.next(null);
  }
}
