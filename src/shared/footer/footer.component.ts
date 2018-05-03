import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms/shared/cms.service';
import { CmsDetailService } from '../cms-detail/shared/cms-detail.service';
import { Cms } from '../cms/shared/cms';
import { CmsDetail } from '../cms-detail/shared/cms-detail';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../facet/filter/shared/filter';
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent implements OnInit {

  cms: Cms;

  links: CmsDetail[] = [];

  constructor(private cmsService: CmsService,
              private cmsDetailService: CmsDetailService,
              private router: Router) {
  }

  ngOnInit() {
    this.getLinks();
  }

  getLinks() {
    this.cmsDetailService.filters$.next([ {column: 'name', operator: '==', value: 'footer.links'} ]);
    this.cmsService.getCmss()
      .subscribe((cmss: Cms[]) => {
        if (cmss && cmss.length > 0) {
          this.cms = cmss[ 0 ];
          this.cmsDetailService.filters$.next([ {column: 'cms', operator: '==', value: this.cms.key} ]);
          this.cmsDetailService.getCmsDetails()
            .subscribe((cmsDetails: CmsDetail[]) => {
              const links = cmsDetails.filter((cmsD) => cmsD.parent === null);
              const sublinks = cmsDetails.filter((cmsD) => cmsD.parent !== null);
              this.links = links.map((link: CmsDetail) => {
                const children = [];
                sublinks.forEach((sublink: CmsDetail) => {
                  if (link.key === sublink.parent) {
                    children.push(sublink);
                  }
                });
                link.children = children;

                return link;

              });
            });
        }
      });
  }
}
