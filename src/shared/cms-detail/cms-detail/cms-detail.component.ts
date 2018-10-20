import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../facet/filter/shared/filter';
import { CmsDetailService } from '../shared/cms-detail.service';
import { CmsDetail } from '../shared/cms-detail';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-car-cms-detail',
  templateUrl: './cms-detail.component.html',
  styleUrls: [ './cms-detail.component.scss' ]
})
export class CmsDetailComponent implements OnInit {

  cmsDetail: CmsDetail;

  constructor(private cmsDetailService: CmsDetailService,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.show();
    this.activatedRoute.params
      .subscribe((value: { title: string }) => {
        if (value.title) {
          const key = value.title.substring(0, value.title.indexOf('-'));
          this.cmsDetailService.getCmsDetail(key)
            .subscribe((cmsDetail: CmsDetail) => {
              this.cmsDetail = cmsDetail;
              this.loaderService.hide();
            });
        } else {
          this.loaderService.hide();
        }
      });
  }

}
