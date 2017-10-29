import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from './../user/user.service';
import { SidenavService } from './sidenav.service';
import { Subscription } from 'rxjs/Subscription';
import { ToggleState } from './toggle';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatDrawer;

  private subscription: Subscription;

  constructor(public userService: UserService, private sidenavService: SidenavService) {}

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
