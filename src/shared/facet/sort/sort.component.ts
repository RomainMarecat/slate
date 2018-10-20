import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Sort } from './shared/sort';

@Component({
  selector: 'app-facet-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Output() closeSidenav: EventEmitter < boolean > = new EventEmitter < boolean > ();
  @Output() sorted: EventEmitter < Sort > = new EventEmitter < Sort > ();

  constructor() {}

  ngOnInit() {

  }

  onClose(close ?: boolean) {
    this.closeSidenav.emit(close);
  }

  onSort(sort: Sort) {
    this.sorted.emit(sort);
  }
}
