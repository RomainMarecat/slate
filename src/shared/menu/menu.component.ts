import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from '../user/shared/user.service';
import { MenuService } from './menu.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SearchComponent } from '../search/search/search.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() config: {
    displayBurgerMenu: boolean,
    displayButtonConnection: boolean,
    displayIconButtonConnection: boolean,
    underlineTitle: boolean,
    displayCart: boolean
  };

  title: string;
  private subscription: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private menuService: MenuService,
              private sidenavService: SidenavService,
              public userService: UserService,
              public matDialog: MatDialog) {
    this.config = {
      displayBurgerMenu: true,
      displayButtonConnection: true,
      displayIconButtonConnection: false,
      underlineTitle: false,
      displayCart: true
    };
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
    this.matDialog.open(SearchComponent, {
      data: {}
    });
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
