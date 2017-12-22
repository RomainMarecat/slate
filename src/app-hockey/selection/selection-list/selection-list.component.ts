import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../../core/shared/selection/selection.service';
import { Selection } from '../../../core/shared/selection/selection';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {

  // Products collection of Product interface
  selections$: Observable < Selection[] > ;
  selections: Array < Selection > ;
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;

  constructor(private selectionService: SelectionService) {}

  ngOnInit() {
    this.loadSelections(3);
  }

  loadSelections(limit: number) {
    this.selectionService.publishedFilter$.next(true);
    this.selections$ = this.selectionService.getSelections();
  }
}
