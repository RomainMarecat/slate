import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionService } from '../../../core/shared/selection/selection.service';
import { LoaderService } from '../../../core/shared/loader/loader.service';
import { Selection } from '../../../core/shared/selection/selection';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

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

  /**
   *
   * @param SelectionService private selectionService
   * @param LoaderService    private loaderService
   * @param Router           private router
   */
  constructor(private selectionService: SelectionService,
    private loaderService: LoaderService,
    private router: Router) {
    this.innerHeight = (document.documentElement.clientHeight - 65).toString() + 'px';
  }

  /**
   * Init all selections
   */
  ngOnInit() {
    this.loaderService.show();
    this.loadSelections();
  }

  /**
   * Load all selections
   */
  loadSelections() {
    this.selectionService.publishedFilter$.next(true);
    this.selectionService.parentFilter$.next(null);
    this.selectionService.getSelections()
      .take(1)
      .subscribe((rows: Selection[]) => {
        this.selections = rows;
        if (rows.length > 0) {
          if (this.selectionService.parentFilter$.getValue() === null) {
            this.rootSelections = this.getNestedChildren(rows);
          }
        }
        this.loaderService.hide();
      });
  }

  /**
   * On expand selection, show children in current root tree
   * @param Selection selection
   */
  expandChildren(selection: Selection) {
    this.currentSelectedSelection = selection;
    const selected = this.findOneBy(selection, 'key', selection.key);
    if (selected.children && selected.children.length > 0) {
      const root = this.findRoot(selected);
      root.children = selected.children;
      this.rootSelections = this.rootSelections.map((item: Selection) => {
        if (item.key === root.key) {
          item = root;
        }
        return item;
      });
    } else if ((!selected.children || selected.children.length === 0) && this.currentSelectedSelection) {
      this.router.navigate(['/selection/' + this.currentSelectedSelection.key + '/products/']);
    }
  }

  /**
   * find Root in tree
   * @param  Selection object
   * @return Selection
   */
  findRoot(object: Selection): Selection {
    const root = this.findParent(object);
    if (root.parent !== null) {
      this.findParent(root);
    }

    return root;
  }

  /**
   * find parent in tree
   * @param  Selection object
   * @return Selection
   */
  findParent(object: Selection): Selection {
    const parent = object && object.parent !== null ? object.parent : object;
    return this.selections.reduce((prev: any, value: Selection) => {
      return value.key === parent ? value : prev;
    }, null);
  }

  /**
   * findOneBy predicate in tree
   * @param {Selection} object
   * @param {string column
   * @param {string}    value
   */
  findOneBy(object: Selection, column: string = 'id', value: string) {
    if (object[column] === value) {
      return object;
    }
    let result, property;
    for (property in object) {
      if (object.hasOwnProperty(property) && typeof object[property] === 'object') {
        result = this.findOneBy(object[property], column, value);
        if (result) {
          return result;
        }
      }
    }
    return result;
  }

  /**
   * get tree children
   * @param  Selection[] selections
   * @param  string  parent
   * @return Selection[]
   */
  getNestedChildren(
    selections: Selection[],
    parent: string = null): Selection[] {
    const nested: Selection[] = [];
    for (const i in selections) {
      if (selections[i] && selections[i].parent === parent) {
        const children = this.getNestedChildren(selections, selections[i].key);

        if (children.length) {
          selections[i].children = children;
        }
        nested.push(selections[i]);
      }
    }
    return nested;
  }

  /**
   * On active player or goalie selection
   * @param Selection selection
   */
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
