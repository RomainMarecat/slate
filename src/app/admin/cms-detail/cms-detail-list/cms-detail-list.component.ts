import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsDetail } from './../../shared/cms-detail/cms-detail';
import { Cms } from './../../shared/cms/cms';
import { CmsDetailService } from './../../shared/cms-detail/cms-detail.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cms-detail-list',
  templateUrl: './cms-detail-list.component.html',
  styleUrls: ['./cms-detail-list.component.scss']
})
export class CmsDetailListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  cmsKey: string;
  cmsDetails$: Observable < CmsDetail[] > ;
  selected: CmsDetail[];
  isLoading: boolean;

  /**
   * @param {ElementRef} table
   * @param {CmsService} CmsService
   */
  constructor(private table: ElementRef, private cmsDetailService: CmsDetailService,
    private activeRoute: ActivatedRoute) {
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
    }];
    this.selected = [];
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
        this.cmsDetails$ = this.cmsDetailService.getCmsDetailByCms(value.key);
      } else {
        this.cmsDetails$ = Observable.of([]);
      }
    });
  }

  /**
   * On select add new list in selection array
   * @param any selected
   */
  onSelect(selected) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}

  onScroll(event: any) {}

  onCheckboxChangeFn(event) {}
  selectFn(allRowsSelected) {}
}
