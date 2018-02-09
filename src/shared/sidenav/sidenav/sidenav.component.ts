import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../user/user.service';
import { SidenavService } from './../sidenav.service';
import { Subscription } from 'rxjs/Subscription';
import { ToggleState } from './../toggle';
import { MatDrawer } from '@angular/material';
import { LoaderService } from '../../../shared/loader/loader.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { Observable } from 'rxjs/Observable';
import { reduce, map, debounceTime } from 'rxjs/operators';
import { User } from '../../user/user';

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

  private subscriptionSidenav: Subscription;
  private subscriptionSidenavFilter: Subscription;

  /**
   *
   * @param {UserService} userService
   * @param {SidenavService} sidenavService
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    public userService: UserService,
    private loaderService: LoaderService,
    private i18nService: I18nService,
    private sidenavService: SidenavService) {
    this.authorized = [];
    this.authorized.push('6glT4N2SUMW2HWibhefumuRiVIh2');
    this.authorized.push('oIAtyPwagRfIKxSwX6O3ncGocyD3');
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
    this.userService.getAuthState()
      .subscribe((user: User) => {
        this.isAuthorized = (user && user.uid && this.authorized.includes(user.uid));
      });
  }

  ngOnDestroy() {
    this.subscriptionSidenav.unsubscribe();
    this.subscriptionSidenavFilter.unsubscribe();
  }
}