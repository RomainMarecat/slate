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
import { timeout } from 'rxjs/operators';
import { MenuConfiguration } from './shared/menu-configuration';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  _config: MenuConfiguration = {
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
    displayCart: true,
    connectionBtn: {
      mat_color: 'primary'
    }
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

  isLogged: boolean;
  isLoading: boolean;

  constructor(public router: Router,
              private localizeRouterService: LocalizeRouterService,
              private activatedRoute: ActivatedRoute,
              private menuService: MenuService,
              private sidenavService: SidenavService,
              private userService: UserService,
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

    this.getAuthentication();
  }

  getAuthentication() {
    this.isLoading = true;
    const userSubscription: Subscription = this.userService.getAuthState()
      .pipe(timeout(20000))
      .subscribe((user: User) => {
        if (userSubscription) {
          userSubscription.unsubscribe();
        }
        if (user && user.uid) {
          this.isLogged = true;
          this.isLoading = false;
          this.isAdmin = adminsID.includes(user.uid);
          return;
        }

        this.isLogged = false;
        this.isLoading = false;
      }, () => {
        this.isLogged = false;
        this.isLoading = false;
      });
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.getAuthentication();
    });
  }

  loginGoogle() {
    this.userService.loginGoogle();
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Can open or close sidenav
   */
  toggleSidenav() {
    this.sidenavService.open();
  }

  @Input() set config(config: MenuConfiguration) {
    if (config) {
      this._config = {...this._config, ...config};
    }
  }

  get config(): MenuConfiguration {
    return this._config;
  }
}
