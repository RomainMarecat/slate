import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from '../user/shared/user.service';
import { MenuService } from './menu.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SearchDialogComponent } from '../search/search-dialog/search-dialog.component';
import { Filter } from '../facet/filter/shared/filter';
import { LocalizeRouterService } from 'localize-router';
import { User } from '../user/shared/user';
import { adminsID } from '../guard/admin';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  _config: {
    displayLogo: boolean,
    displayAdminRecipe: boolean,
    urlAdmin: string[],
    displayBurgerMenu: boolean,
    displayButtonConnection: boolean,
    displayIconButtonConnection: boolean,
    customIconConnection: boolean,
    displaySearchIcon: boolean,
    underlineTitle: boolean,
    displayCart: boolean,
    show_page_title: boolean,
    connectionBtn?: {
      color: string;
      background: string;
    }
  } = {
    displayLogo: false,
    displayAdminRecipe: false,
    show_page_title: true,
    urlAdmin: [],
    displayBurgerMenu: true,
    displayButtonConnection: true,
    displayIconButtonConnection: false,
    displaySearchIcon: true,
    customIconConnection: true,
    underlineTitle: false,
    displayCart: true
  };

  @Input() _documents: any[];

  @Input() searchUrl: string;

  title: string;

  private subscription: Subscription;

  searchDialogRef: MatDialogRef<SearchDialogComponent, boolean>;

  @Output() queryChange: EventEmitter<{limit?: number, filters?: Filter[]}> = new EventEmitter<{limit?: number, filters?: Filter[]}>();

  routerAdminUrl: string[];
  currentRoute: string[];
  isAdmin: boolean;

  constructor(public router: Router,
              private localizeRouterService: LocalizeRouterService,
              private activatedRoute: ActivatedRoute,
              private menuService: MenuService,
              private sidenavService: SidenavService,
              public userService: UserService,
              public matDialog: MatDialog) {
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

    // Route admin observation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routerAdminUrl = this.config.urlAdmin.map((route: string, i: number) => {
          if (i === 0) {
            return this.localizeRouterService.translateRoute(route) as string;
          }
          return route;
        });
        this.currentRoute = this.router.url.substring(1).split('/');
      }
    });

    this.userService.getAuthState().subscribe((user: User) => {
      if (user && user.uid) {
        this.isAdmin = adminsID.includes(user.uid);
      }
    });
  }

  logout() {
    this.userService.logout().subscribe(() => {
    });
  }

  search() {
    this.searchDialogRef = this.matDialog.open(SearchDialogComponent, {
      data: {
        documents: this.documents,
        url: this.searchUrl
      },
      panelClass: 'search-dialog',
    });

    const queryChange = this.searchDialogRef.componentInstance.queryChange
      .subscribe((query: {limit?: number, filters?: Filter[]}) => {
        this.queryChange.emit(query);
      });
  }

  @Input() set documents(documents: any[]) {
    this._documents = documents;
    if (this.searchDialogRef) {
      this.searchDialogRef._containerInstance._config.data.documents = this.documents;
    }
  }

  get documents() {
    return this._documents;
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

  @Input() set config(config) {
    if (config) {
      this._config = {...this._config, ...config};
    }
  }

  get config() {
    return this._config;
  }
}
