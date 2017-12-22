import { Component, OnInit, ElementRef } from '@angular/core';
import { Selection } from '../../../shared/navigation/selection/selection';
import { SelectionService } from '../../../shared/navigation/selection/selection.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-Selection-list',
  templateUrl: './Selection-list.component.html',
  styleUrls: ['./Selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  selections$: Observable < Selection[] > ;
  selected: Selection[];
  isLoading: boolean;

  /**
   * @param {ElementRef} table
   * @param {SelectionService} SelectionService
   */
  constructor(private table: ElementRef, private selectionService: SelectionService) {
    this.columns = [{
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'description',
      name: 'description',
      flexGrow: 1
    }, {
      prop: 'keywords',
      name: 'keywords',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, ];
    this.selected = [];
    this.isLoading = true;
  }

  /**
   * set at published at now et activate published to true
   */
  publishSelection() {
    this.selected.forEach((Selection: Selection) => {
      if (Selection.published === false) {
        Selection.published = true;
        if (!Selection.published_at) {
          Selection.published_at = new Date();
        }
      }

      this.selectionService.updateSelection(Selection);
    });
  }

  /**
   * Delete a Selection from list
   */
  deleteSelection() {
    this.selected.forEach((Selection: Selection) => {
      this.selectionService.deleteSelection(Selection);
    });
  }

  /**
   * Init list of Selection
   */
  ngOnInit() {
    this.selections$ = this.selectionService.getSelections();
    this.isLoading = false;
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}

  onScroll(event: any) {}
}
