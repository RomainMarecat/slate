import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from './../../product/product.service';

export class Sort {
  column: string;
  direction: string;
}

@Component({
  selector: 'app-facet-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Output('closeSidenav') closeSidenav: EventEmitter < boolean > = new EventEmitter < boolean > ();
  @Output('sorted') sorted: EventEmitter < Sort > = new EventEmitter < Sort > ();

  constructor(private productService: ProductService) {}

  ngOnInit() {}

  close() {
    this.closeSidenav.emit(true);
  }

  onSort(column: string, direction: string) {
    const sort = { column: column, direction: direction } as Sort;
    this.sorted.emit(sort);
    this.productService.orderBy$.next(sort);
  }

}
