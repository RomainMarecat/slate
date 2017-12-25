import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../../core/shared/selection/selection.service';
import { LoaderService } from '../../../core/shared/loader/loader.service';
import { Selection } from '../../../core/shared/selection/selection';
import { Observable } from 'rxjs/Observable';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {

  // Products collection of Product interface
  selections: Array < Selection > = [];
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;

  public cols: Observable < number > ;

  constructor(private selectionService: SelectionService,
    private loaderService: LoaderService,
    private observableMedia: ObservableMedia) {}

  ngOnInit() {
    const grid = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 2],
      ['lg', 2],
      ['xl', 2]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable()
      .map(change => grid.get(change.mqAlias))
      .startWith(start);
    this.loaderService.show();
    this.loadSelections(3);
  }

  loadSelections(limit: number) {
    this.selectionService.publishedFilter$.next(true);
    this.selectionService.getSelections().subscribe((rows: Selection[]) => {
      this.selections = rows;
      this.loaderService.hide();
    });
  }
}
