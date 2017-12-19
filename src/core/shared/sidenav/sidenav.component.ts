import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user/user.service';
import { SidenavService } from './sidenav.service';
import { Subscription } from 'rxjs/Subscription';
import { ToggleState } from './toggle';
import { MatDrawer } from '@angular/material';
import { LoaderService } from '../loader/loader.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatDrawer;

  private subscription: Subscription;

  /**
   *
   * @param {UserService} userService
   * @param {SidenavService} sidenavService
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    public userService: UserService, private loaderService: LoaderService,
    private i18nService: I18nService, private sidenavService: SidenavService) {}

  /**
   * Subscribe to toggle event from sidenav
   */
  ngOnInit() {
    this.subscription = this.sidenavService.toggleState
      .subscribe((state: ToggleState) => {
        this.sidenav.toggle();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
