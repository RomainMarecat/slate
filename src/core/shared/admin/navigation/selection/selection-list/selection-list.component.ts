import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Selection } from '../../../../../shared/selection/selection';
import { SelectionService } from '../../../shared/navigation/selection/selection.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any[];
  selections: Selection[] = [];
  selected: Selection[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;

  /**
   * @param {ElementRef} table
   * @param {SelectionService} SelectionService
   */
  constructor(private table: ElementRef,
    private selectionService: SelectionService,
    private router: Router
  ) {

    this.selected = [];
    this.isLoading = true;

  }

  /**
   * set at published at now et activate published to true
   */
  publishSelection() {
    this.selected.forEach((selection: Selection) => {
      if (selection.published === false) {
        selection.published = true;
        if (!selection.published_at) {
          selection.published_at = new Date();
        }
      }

      this.selectionService.updateSelection(selection);
    });
  }

  /**
   * Delete a Selection from list
   */
  deleteSelection() {
    this.selected.forEach((selection: Selection) => {
      this.selectionService.deleteSelection(selection);
    });
  }

  /**
   * Init list of Selection
   */
  ngOnInit() {
    this.selectionService.getSelections()
      .subscribe((selections: Selection[]) => {
        this.selections = selections;
        this.isLoading = false;
      });

    this.columns = [{
        width: 50,
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizeable: false,
        cellTemplate: this.checkboxCell,
        headerTemplate: this.checkboxHeader,
      },
      {
        prop: 'name',
        name: 'name',
        flexGrow: 1
      }, {
        prop: 'translations.fr',
        name: 'translations.fr',
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
        prop: 'level',
        name: 'level',
        flexGrow: 1
      }, {
        prop: 'parent',
        name: 'parent',
        flexGrow: 1
      }, {
        prop: 'images',
        name: 'images',
        flexGrow: 1
      }, {
        prop: 'products',
        name: 'products',
        flexGrow: 1
      }, {
        prop: 'published_at',
        name: 'published_at',
        flexGrow: 1
      }, {
        prop: 'published',
        name: 'published',
        flexGrow: 1
      },
    ];
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate(['/admin/navigation/selection/edit/', event.row.key]);
    }
  }

  onScroll(event: any) {}
}
