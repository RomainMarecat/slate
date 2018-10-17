import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cms } from '../../../cms/shared/cms';
import { CmsService } from '../../../cms/shared/cms.service';
import { Observable } from 'rxjs/Observable';
import { MenuService } from 'shared/menu/menu.service';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-cms-list',
  templateUrl: './cms-list.component.html',
  styleUrls: ['./cms-list.component.scss']
})
export class CmsListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  cmsList$: Observable<Cms[]>;
  selected: Cms[];
  isLoading: boolean;

  constructor(private table: ElementRef,
              private cmsService: CmsService,
              private router: Router,
              private menuService: MenuService,
              private media: ObservableMedia,
              private localizeRouterService: LocalizeRouterService) {
    this.columns = [{
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'site_name',
      name: 'site_name',
      flexGrow: 1
    }, {
      prop: 'key',
      name: 'key',
      flexGrow: 1
    }];
    this.selected = [];
    this.isLoading = true;
  }

  /**
   * set at published at now et activate published to true
   */
  publishCms() {
    this.selected.forEach((cms: Cms) => {
      this.cmsService.updateCms(cms);
    });
  }

  /**
   * Delete a Cms from list
   */
  deleteCms() {
    this.selected.forEach((cms: Cms) => {
      this.cmsService.deleteCms(cms);
    });
  }

  /**
   * Init list of Cms
   */
  ngOnInit() {
    this.cmsList$ = this.cmsService.getCmss();
    this.isLoading = false;
    this.menuService.nextTitle('cms');
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: any) {
    // add media query xs to replace 1
    this.media.asObservable()
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          if (event.type === 'click' && event.row) {
            const cms = event.row as Cms;
            this.showCmsDetail(cms);
          }
        } else {
          if (event.type === 'dblclick' && event.row) {
            const cms = event.row as Cms;
            this.showCmsDetail(cms);
          }
        }
      });

  }

  showCmsDetail(cms: Cms) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('/admin'),
      'cms',
      cms.key,
      'cms-details'
    ]);
  }

  onScroll(event: any) {
  }

  onCheckboxChangeFn(event) {
  }

  selectFn(allRowsSelected) {
  }
}
