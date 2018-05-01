import { Component, OnInit } from '@angular/core';
import { CmsService } from '../admin/shared/cms/cms.service';
import { CmsDetailService } from '../admin/shared/cms-detail/cms-detail.service';
import { Cms } from '../admin/shared/cms/cms';
import { CmsDetail } from '../admin/shared/cms-detail/cms-detail';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent implements OnInit {

  cms: Cms;

  links: CmsDetail[] = [];

  constructor(private cmsService: CmsService,
              private cmsDetailService: CmsDetailService) {
  }

  ngOnInit() {
    this.getLinks();
  }

  getLinks() {
    this.cmsService.nameFilters$.next('footer.links');
    this.cmsService.getCmss()
      .subscribe((cmss: Cms[]) => {
        if (cmss && cmss.length > 0) {
          this.cms = cmss[ 0 ];
          const cms: Cms = cmss[ 0 ];
          this.cmsDetailService.parentFilters$.next(null);
          this.cmsDetailService.cmsFilters$.next(cms.key);
          this.cmsDetailService.getCmsDetails()
            .subscribe((cmsDetails: CmsDetail[]) => {
              this.links = cmsDetails.filter((cmsD) => cmsD.parent === null);
              this.links.forEach((link: CmsDetail, index: number) => {
                this.getSubLinks(link, index);
              });
            });
        }
      });
  }

  getSubLinks(cmsDetail: CmsDetail, index: number) {
    this.cmsDetailService.parentFilters$.next(cmsDetail.key);
    this.cmsDetailService.getCmsDetails()
      .subscribe((children: CmsDetail[]) => {
        cmsDetail.children = children;
        this.links[index] = cmsDetail;
      });
  }
}
