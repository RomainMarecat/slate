import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../user/shared/user.service';
import { SidenavService } from './../sidenav.service';
import { Subscription } from 'rxjs';
import { ToggleState } from './../toggle';
import { MatDrawer } from '@angular/material';
import { LoaderService } from '../../../shared/loader/loader.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { User } from '../../user/shared/user';
import { adminsID } from '../../guard/admin';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {
  authorized: string[] = [];
  isAuthorized = false;
  // @todo add button with cms
  cmsDetail: any;
  viewFilter: boolean;
  @ViewChild('sidenavFilter') sidenavFilter: MatDrawer;
  @ViewChild('sidenav') sidenav: MatDrawer;

  navLinks: {label: string, link: string}[] = [
    {link: '/admin/order', label: 'admin.cta.order'},
    {link: '/a2hs', label: 'sidenav.card.list-item.pwa'},
    {link: '/admin/product', label: 'admin.cta.product'},
    {link: '/admin/contact', label: 'admin.cta.contact'},
    {link: '/admin/article', label: 'admin.cta.article'},
    {link: '/admin/attribute', label: 'admin.cta.attribute'},
    {link: '/admin/selection', label: 'admin.cta.selection'},
    {link: '/admin/category', label: 'admin.cta.category'},
    {link: '/admin/cms', label: 'admin.cta.cms'},
    {link: '/admin/map', label: 'admin.cta.map'},
    {link: '/admin/offer', label: 'admin.cta.offer'},
    {link: '/admin/partner', label: 'admin.cta.partner'},
    {link: '/material', label: 'admin.cta.material'},
  ];

  configMenu = {
    connectionBtn: {
      color: '#fff',
      background: '#90323d'
    }
  };

  private subscriptionSidenav: Subscription;
  private subscriptionSidenavFilter: Subscription;
  private subscriptionAuthState: Subscription;

  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              public userService: UserService,
              private loaderService: LoaderService,
              private i18nService: I18nService,
              private sidenavService: SidenavService) {
    this.viewFilter = true;
    this.authorized = adminsID;
  }

  /**
   * Subscribe to toggle event from sidenav
   */
  ngOnInit() {
    this.subscriptionSidenav = this.sidenavService.toggleState
      .subscribe((state: ToggleState) => {
        if (state.side === 'left') {
          this.sidenav.toggle();
        }
      });

    this.subscriptionSidenavFilter = this.sidenavService.toggleState
      .subscribe((state: ToggleState) => {
        if (state.side === 'right') {
          this.viewFilter = false;
          this.sidenavFilter.toggle();
          if (state.view === 'filter') {
            this.viewFilter = true;
          }

        }
      });

    this.getAuthorized();
  }

  getAuthorized() {
    this.subscriptionAuthState = this.userService.getAuthState()
      .subscribe((user: User) => {
        this.isAuthorized = (user && user.uid && this.authorized.includes(user.uid));
      });
  }

  ngOnDestroy() {
    this.subscriptionSidenav.unsubscribe();
    this.subscriptionSidenavFilter.unsubscribe();
    this.subscriptionAuthState.unsubscribe();
  }
}
