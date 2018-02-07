import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidenavService } from './../sidenav.service';
import { Subscription } from 'rxjs/Subscription';
import { ToggleState } from './../toggle';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-sidenav-filter',
  templateUrl: './sidenav-filter.component.html',
  styleUrls: ['./sidenav-filter.component.scss']
})
export class SidenavFilterComponent implements OnInit, OnDestroy {
  @ViewChild('sidenavFilter') sidenavFilter: MatDrawer;
  private subscription: Subscription;

  constructor(private sidenavService: SidenavService) {}

  /**
   * Subscribe to toggle event from sidenav
   */
  ngOnInit() {
    this.subscription = this.sidenavService.toggleState
      .subscribe((state: ToggleState) => {
        this.sidenavFilter.toggle();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
