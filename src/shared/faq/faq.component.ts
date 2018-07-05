import { Component, OnInit } from '@angular/core';
import { Cms } from '../cms/shared/cms';
import { CmsDetail } from '../cms-detail/shared/cms-detail';
import { CmsService } from '../cms/shared/cms.service';
import { CmsDetailService } from '../cms-detail/shared/cms-detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showcase-faq',
  templateUrl: './faq.component.html',
  styleUrls: [ './faq.component.scss' ]
})
export class FaqComponent implements OnInit {

  cms: Cms;
  navigations: CmsDetail[] = [];

  constructor(private cmsService: CmsService,
              private cmsDetailService: CmsDetailService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getNavigations();
  }

  getNavigations() {
    this.cmsService.filters$.next([ {column: 'name', operator: '==', value: 'faq.links'} ]);
    this.cmsService.getCmss()
      .subscribe((cmss: Cms[]) => {
        if (cmss && cmss.length > 0) {
          this.cms = cmss[ 0 ];
          this.cmsDetailService.filters$.next([ {column: 'cms', operator: '==', value: this.cms.key} ]);
          this.cmsDetailService.getCmsDetails()
            .subscribe((cmsDetails: CmsDetail[]) => {
              const links = cmsDetails.filter((cmsD) => cmsD.parent === null || typeof cmsD.parent === 'undefined');
              const sublinks = cmsDetails.filter((cmsD) => cmsD.parent !== null);
              this.navigations = links.map((link: CmsDetail) => {
                const children: CmsDetail[] = [];
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

  onAnchorClick() {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f);
      if (element) {
        // element.scrollIntoView(element);
      }
    });
  }

}
