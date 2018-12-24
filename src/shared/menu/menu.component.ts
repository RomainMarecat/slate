import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from '../user/shared/user.service';
import { MenuService } from './menu.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SearchDialogComponent } from '../search/search-dialog/search-dialog.component';
import { Filter } from '../facet/filter/shared/filter';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  _config: {
    displayAdminRecipe: boolean,
    displayBurgerMenu: boolean,
    displayButtonConnection: boolean,
    displayIconButtonConnection: boolean,
    underlineTitle: boolean,
    displayCart: boolean,
    connectionBtn?: {
      color: string;
      background: string;
    }
  } = {
    displayAdminRecipe: false,
    displayBurgerMenu: true,
    displayButtonConnection: true,
    displayIconButtonConnection: false,
    underlineTitle: false,
    displayCart: true
  };

  @Input() _documents: any[];

  @Input() searchUrl: string;

  title: string;

  private subscription: Subscription;

  searchDialogRef: MatDialogRef<SearchDialogComponent, boolean>;

  @Output() queryChange: EventEmitter<{limit?: number, filters?: Filter[]}> = new EventEmitter<{limit?: number, filters?: Filter[]}>();

  constructor(private router: Router,
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
