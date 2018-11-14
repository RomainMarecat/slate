import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseListComponent } from '../../../base/base-list/base-list.component';
import { Recipe } from '../../../../../app-recipe/public/recipe/shared/recipe';
import { MenuService } from '../../../../menu/menu.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RecipeService } from '../../../../../app-recipe/public/recipe/shared/recipe.service';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-alr-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent extends BaseListComponent<Recipe> implements OnInit {

  @ViewChild('dataTableComponentTable') dataTableComponentTable: DatatableComponent;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;
  @ViewChild('priceCell') priceCell: TemplateRef<any>;
  @ViewChild('desktopCell') desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader') desktopHeader: TemplateRef<any>;

  constructor(protected menuService: MenuService,
              protected recipeService: RecipeService,
              protected localizeRouterService: LocalizeRouterService,
              protected router: Router,
              public dialog: MatDialog) {
    super(menuService, recipeService, localizeRouterService, router, dialog);
  }

  ngOnInit() {
    this.isLoading = true;
    this.menuService.nextTitle('menu.title.recipe');
    this.columns = this.getColumns();

    this.recipeService.query$.next({
      recipeBy: {
        column: 'updated_at',
        direction: 'desc'
      }
    });
    this.recipeService.getRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.documents = recipes;
        this.cache = recipes;
        this.isLoading = false;
      }, () => {
        this.documents = [];
        this.cache = [];
        this.isLoading = false;
      });
  }

  /**
   * route to edit document
   */
  editDocument(document: Recipe) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('admin'),
      'recipe'
    ]).then(() => {
      this.router.navigate([
        this.localizeRouterService.translateRoute('admin'),
        'recipe',
        'edit',
        document['key']
      ]);
    });
  }

  getColumns(): TableColumn[] {
    return [
      {
        width: 75,
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizeable: false,
        headerTemplate: this.checkboxHeader,
        cellTemplate: this.checkboxCell,
      }, {
        prop: 'key',
        name: 'key',
        flexGrow: 1,
        headerTemplate: this.desktopHeader,
        minWidth: 50,
      }, {
        prop: 'name',
        name: 'name',
        flexGrow: 1,
        headerTemplate: this.desktopHeader,
      },
      {
        prop: 'slug',
        name: 'slug',
        flexGrow: 1,
        headerTemplate: this.desktopHeader,
      }, {
        prop: 'key',
        name: 'Actions',
        flexGrow: 1,
        headerTemplate: this.desktopHeader,
        cellTemplate: this.actionsCell,
      }
    ];
  }
}
