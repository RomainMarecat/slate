import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from '../user/shared/user.service';
import { MenuService } from './menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  title: string;
  private subscription: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private menuService: MenuService,
              private sidenavService: SidenavService,
              public userService: UserService) {
    this.title = null;
  }

  /**
   * Subscribe on title
   */
  ngOnInit() {
    this.subscription = this.menuService.menuState
      .subscribe((title: string) => {
        this.title = title;
      });
  }

  search() {
  }

  /**
   * On destroy component
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Can open or close sidenav
   */
  toggleSidenav() {
    this.sidenavService.open();
  }
}
