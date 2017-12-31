import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionService } from '../../../core/shared/selection/selection.service';
import { LoaderService } from '../../../core/shared/loader/loader.service';
import { Selection } from '../../../core/shared/selection/selection';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {

  // Root selections
  rootSelections: Selection[] = [];
  // Selections collections
  selections: Selection[] = [];
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;
  currentSelectedSelection: Selection;
  innerHeight: string;
  active = { 'hockey-player': '', 'hockey-goalie': '' };

  constructor(private selectionService: SelectionService,
    private loaderService: LoaderService,
    private router: Router) {
    this.innerHeight = (document.documentElement.clientHeight - 65).toString() + 'px';
  }

  ngOnInit() {
    this.loaderService.show();
    this.loadSelections(3);
  }

  loadSelections(limit: number) {
    this.selectionService.publishedFilter$.next(true);
    this.selectionService.parentFilter$.next(null);
    this.selectionService.getSelections()
      .subscribe((rows: Selection[]) => {
        if (rows.length > 0) {

          this.rootSelections = this.selections = rows.filter((row: Selection) => row.level === 1);
          this.selections = this.selections.map((root: Selection) => {
            root.children = rows.filter((row: Selection) => row.level > 1 && row.parent === root.key);
            return root;
          });
        } else if (rows.length === 0 && this.currentSelectedSelection) {
          this.router.navigate(['/selection/' + this.currentSelectedSelection.key + '/products/']);
        }
        this.loaderService.hide();
      });
  }

  selectSelectionsChildren(selection: Selection) {
    this.loaderService.show();
    this.currentSelectedSelection = selection;
    this.selectionService.levelFilter$.next(null);
    this.selectionService.publishedFilter$.next(true);
    this.selectionService.parentFilter$.next(selection.key);
  }

  onActive(selection: Selection) {
    // Player
    if (selection.key === 'TGO8sKZeIUnsuVMXAdJP') {
      this.active = {
        'hockey-player': this.active[selection.slug] === '' ?
          'active' : '',
        'hockey-goalie': '',
      };
      // Goalie
    } else {
      this.active = {
        'hockey-goalie': this.active[selection.slug] === '' ?
          'active' : '',
        'hockey-player': ''
      };
    }
  }
}
