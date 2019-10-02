import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CmsService } from '../cms/shared/cms.service';
import { CmsDetailService } from '../cms-detail/shared/cms-detail.service';
import { Cms } from '../cms/shared/cms';
import { CmsDetail } from '../cms-detail/shared/cms-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  cms: Cms;

  links: CmsDetail[] = [];

  @Input() options: {
    displayFooter: boolean,
    displayTopButton: boolean,
    displayLinks: boolean,
    displaySublinks: boolean
  } = {
    displayFooter: true,
    displayTopButton: true,
    displayLinks: true,
    displaySublinks: true
  };

  constructor(private cmsService: CmsService,
              private cmsDetailService: CmsDetailService,
              private router: Router) {
  }

  ngOnInit() {
    this.getLinks();
  }

  getLinks() {
    this.cmsService.filters$.next([{column: 'name', operator: '==', value: 'footer.links'}]);
    const cmsSubscription: Subscription = this.cmsService.getCmss()
      .subscribe((cmss: Cms[]) => {
        cmss = cmss.filter((v) => v.name === 'footer.links');
        if (cmss && cmss.length > 0) {
          this.cms = cmss[0];
          if (cmsSubscription) {
            cmsSubscription.unsubscribe();
          }
          this.cmsDetailService.filters$.next([{column: 'cms', operator: '==', value: this.cms.key}]);
          this.getCmsDetails();
        }
      });
  }

  getCmsDetails() {
    const cmsDetailSubscription: Subscription = this.cmsDetailService.getCmsDetails()
      .subscribe((cmsDetails: CmsDetail[]) => {
        const links = cmsDetails.filter((cmsD) => cmsD.parent === null || typeof cmsD.parent === 'undefined');
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
}
