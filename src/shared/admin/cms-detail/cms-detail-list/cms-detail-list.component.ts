import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsDetail } from '../../../cms-detail/shared/cms-detail';
import { CmsDetailService } from '../../../cms-detail/shared/cms-detail.service';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../../../facet/filter/shared/filter';
import 'rxjs/add/operator/take';
import { AlertService } from '../../../popup/alert.service';
import { of } from 'rxjs/internal/observable/of';
import { CmsService } from 'shared/cms/shared/cms.service';
import { Cms } from 'shared/cms/shared/cms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cms-detail-list',
  templateUrl: './cms-detail-list.component.html',
  styleUrls: ['./cms-detail-list.component.scss']
})
export class CmsDetailListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 75;
  columns: any;
  cmsKey: string;
  cms: Cms;
  cmsDetails$: Observable<CmsDetail[]>;
  selected: CmsDetail[] = [];
  isLoading: boolean;
  activatedRows = {icon: {}, title: {}, parent: {}};

  /**
   * @param {ElementRef} table
   * @param {CmsDetailService} cmsDetailService
   * @param {CmsService} cmsService
   * @param {ActivatedRoute} activeRoute
   * @param {AlertService} alertService
   * @param {TranslateService} translate
   */
  constructor(private table: ElementRef,
              private cmsDetailService: CmsDetailService,
              private cmsService: CmsService,
              private activeRoute: ActivatedRoute,
              private alertService: AlertService,
              private translate: TranslateService) {
    this.columns = [{
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
      prop: 'icon',
      name: 'icon',
      flexGrow: 1
    }, {
      prop: 'parent',
      name: 'parent',
      flexGrow: 1
    }];
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
    this.activeRoute.params.subscribe((value: {key: string}) => {
      this.cmsKey = value.key;
      if (value.key) {
        this.cmsService.getCms(value.key)
          .subscribe((cms: Cms) => {
            this.cms = cms;
          }, (err) => {
            this.alertService.show(err);
          });
        this.cmsDetailService.filters$.next([{column: 'cms', operator: '==', value: value.key}] as Filter[]);
        this.cmsDetails$ = this.cmsDetailService.getCmsDetails();
      } else {
        this.cmsDetails$ = of([]);
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

  /**
   * @param {number} index
   */
  onActivateEdit(index: number) {
    this.activatedRows = {icon: {}, title: {}, parent: {}};
    this.activatedRows[index] = true;
  }

  /**
   *
   * @param {string} column
   * @param {CmsDetail} row
   * @param {string} value
   * @param {number} index
   */
  onEdit(column: string, row: CmsDetail, value: string, index: number) {
    this.activatedRows = {icon: {}, title: {}, parent: {}};
    row[column] = value;
    this.cmsDetailService.updateCmsDetail(row)
      .then(() => {
        this.alertService.show(
          `${this.translate.instant(row.title)} ${this.translate.instant('admin.cms-detail.alert.updated')}`
        );
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
