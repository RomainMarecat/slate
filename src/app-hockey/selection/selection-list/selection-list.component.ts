import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionService } from '../../../shared/selection/selection.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { Selection } from '../../../shared/selection/selection';
import { MenuService } from '../../../shared/menu/menu.service';
import { Observable } from 'rxjs/Observable';
import { take, map, debounceTime } from 'rxjs/operators';
import 'rxjs/add/observable/fromEvent';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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
  innerHeight: string = (document.documentElement.clientHeight - 65).toString() + 'px';
  active = {'hockey-player': '', 'hockey-goalie': ''};

  /**
   *
   * @param translateService
   * @param menuService
   * @param selectionService
   * @param loaderService
   * @param router
   * @param meta
   * @param title
   */
  constructor(private translateService: TranslateService,
              private menuService: MenuService,
              private selectionService: SelectionService,
              private loaderService: LoaderService,
              private router: Router,
              private meta: Meta,
              private title: Title) {
    const $resizeEvent = Observable.fromEvent(window, 'resize')
      .pipe(
        map(() =>
          (document.documentElement.clientHeight - 65).toString() + 'px'
        ),
        debounceTime(500)
      );


    $resizeEvent.subscribe(height => this.innerHeight = height);
  }

  /**
   * Init all selections
   */
  ngOnInit() {
    this.translateService.get(['meta.title.selection', 'meta.description.selection'])
      .subscribe((translations: string[]) => {
        this.meta.addTag({name: 'description', content: translations['meta.description.selection']});
        this.title.setTitle(translations['meta.title.selection']);
      });
    this.menuService.nextTitle('');
    this.loaderService.show();
    this.loadSelections();
  }

  /**
   * Load all selections
   */
  loadSelections() {
    this.selectionService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      }, {
        column: 'parent',
        operator: '==',
        value: null
      },
    ]);
    // We need to subscribe all time because,
    // we can back to the view
    this.selectionService.getSelections()
      .subscribe((rows: Selection[]) => {
        this.selections = rows;
        if (rows.length > 0) {
          // parent value
          if (this.selectionService.filters$.getValue()[1].value === null) {
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
      this.router.navigate(['/selection/' + this.currentSelectedSelection.key + '/products']);
    }
  }

  /**
   * find Root in tree
   * @return Selection
   * @param object
   */
  findRoot(object: Selection): Selection {
    let root = this.findParent(object);

    if (root.parent !== null) {
      root = this.findRoot(root);
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
   * @param object
   * @param column
   * @param value
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
   * @return Selection[]
   * @param selections
   * @param parent
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
   * @param selection
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
