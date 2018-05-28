import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsDetail } from '../../../cms-detail/shared/cms-detail';
import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../../../facet/filter/shared/filter';
import 'rxjs/add/operator/take';
import { AlertService } from '../../../popup/alert.service';

@Component({
  selector: 'app-cms-detail-list',
  templateUrl: './cms-detail-list.component.html',
  styleUrls: [ './cms-detail-list.component.scss' ]
})
export class CmsDetailListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  cmsKey: string;
  cmsDetails$: Observable<CmsDetail[]>;
  selected: CmsDetail[] = [];
  isLoading: boolean;
  activatedRows = {};

  /**
   * @param {ElementRef} table
   * @param cmsDetailService
   * @param activeRoute
   */
  constructor(private table: ElementRef,
              private cmsDetailService: CmsDetailService,
              private activeRoute: ActivatedRoute,
              private alertService: AlertService) {
    this.columns = [ {
      prop: 'key',
      name: 'key',
      flexGrow: 1
    }, {
      prop: 'title',
      name: 'title',
      flexGrow: 1
    }, {
      prop: 'content',
      name: 'content',
      flexGrow: 1
    }, {
      prop: 'parent',
      name: 'parent',
      flexGrow: 1
    } ];
    this.isLoading = true;
  }

  /**
   * set at published at now and activate published to true
   */
  publishCmsDetail() {
    this.selected.forEach((cmsDetail: CmsDetail) => {
      this.cmsDetailService.updateCmsDetail(cmsDetail);
    });
  }

  /**
   * Delete a CmsDetail from list
   */
  deleteCmsDetail() {
    this.selected.forEach((cmsDetail: CmsDetail) => {
      this.cmsDetailService.deleteCmsDetail(cmsDetail);
    });
  }

  /**
   * Init list of Cms
   */
  ngOnInit() {
    this.isLoading = false;
    this.activeRoute.params.subscribe((value: { key: string }) => {
      this.cmsKey = value.key;
      if (value.key) {
        this.cmsDetailService.filters$.next([ {column: 'cms', operator: '==', value: value.key} ] as Filter[]);
        this.cmsDetails$ = this.cmsDetailService.getCmsDetails();
      } else {
        this.cmsDetails$ = Observable.of([]);
      }
    });
  }

  /**
   *
   * @param {string} key
   * @returns {Observable<CmsDetail>}
   */
  getCmsDetail(key: string): Observable<CmsDetail> {
    return this.cmsDetailService.getCmsDetail(key);
  }

  onActivateEdit(index: number) {
    this.activatedRows = {};
    this.activatedRows[ index ] = true;
  }

  onEdit(row: CmsDetail, value: string, index: number) {
    this.activatedRows = {};
    row.title = value;
    this.cmsDetailService.updateCmsDetail(row)
      .then(() => {
        this.alertService.show(`updated ${row.title}`);
      }, (err) => {
        this.alertService.show(err);
      });
  }

  /**
   * On select add new list in selection array
   * @param selected
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  onScroll(event: any) {
  }

  onCheckboxChangeFn(event) {
  }

  selectFn(allRowsSelected) {
  }
}
