import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Filter } from './../../../facet/filter/shared/filter';

@Component({
  selector: 'app-admin-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  @Output('filtered') filtered: EventEmitter < Filter > = new EventEmitter < Filter > ();
  columnSelected = 'translations.fr';
  columns: any;
  filterText: string = '';

  constructor() {}

  ngOnInit() {
    this.columns = this.getColumns();
  }

  getColumns() {
    return [{
      prop: 'translations.fr',
      name: 'name (fr)',
      selected: true
    }, {
      prop: 'images',
      name: 'images',
    }, {
      prop: 'category',
      name: 'category',
    }, {
      prop: 'price',
      name: 'price',
    }, {
      prop: 'published',
      name: 'published',
    }];
  }

  /**
   * Filtre sur les colonnes du produit
   * @param {string } }} event [description]
   */
  updateFilter(event: any) {
    if (event === true) {
      event = 'true';
    } else if (event === false) {
      event = 'false';
    }

    const filter: Filter = {
      column: this.columnSelected,
      operator: '==',
      value: event
    };

    this.filtered.emit(filter);
  }
}
