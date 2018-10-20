import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sort } from './../shared/sort';

@Component({
  selector: 'app-facet-sort-container',
  templateUrl: './sort-container.component.html',
  styleUrls: ['./sort-container.component.scss']
})
export class SortContainerComponent implements OnInit {

  @Output() sorted: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  onSort(sort: Sort) {
    this.sorted.emit(sort);
  }

  close() {
    this.closed.emit(true);
  }
}
