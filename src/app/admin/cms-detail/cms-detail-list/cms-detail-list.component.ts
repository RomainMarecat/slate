import { Component, OnInit, ElementRef } from '@angular/core';
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
  cmsDetails$: Observable < CmsDetail[] > ;
  selected: CmsDetail[];
  isLoading: boolean;

  /**
   * @param {ElementRef} table
   * @param {CmsService} CmsService
   */
  constructor(private table: ElementRef, private cmsDetailService: CmsDetailService) {
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
    this.selected.forEach((cmsDetail: CmsDetail) => {
      this.cmsDetailService.updateCmsDetail(cmsDetail);
    });
  }

  /**
   * Delete a Cms from list
   */
  deleteCms() {
    this.selected.forEach((cmsDetail: CmsDetail) => {
      this.cmsDetailService.deleteCmsDetail(cmsDetail);
    });
  }

  /**
   * Init list of Cms
   */
  ngOnInit() {
    this.cmsDetails$ = this.cmsDetailService.getCmsDetails();
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
