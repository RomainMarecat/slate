import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { Observable } from 'rxjs';
import { Recipe } from '../../../../../app-recipe/recipe/shared/recipe';
import { RecipeService } from '../../../../../app-recipe/recipe/shared/recipe.service';
import { MenuService } from '../../../../menu/menu.service';
import { BaseListComponent } from '../../../base/base-list/base-list.component';

@Component({
  selector: 'app-alr-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent extends BaseListComponent<Recipe> implements OnInit {

  @ViewChild('dataTableComponentTable', {static: false}) dataTableComponentTable: DatatableComponent;
  @ViewChild('actionsCell', {static: false}) actionsCell: TemplateRef<any>;
  @ViewChild('priceCell', {static: false}) priceCell: TemplateRef<any>;
  @ViewChild('desktopCell', {static: false}) desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader', {static: false}) desktopHeader: TemplateRef<any>;

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
    this.getColumns().subscribe(columns => this.columns = columns);

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
        document.key
      ]);
    });
  }

  getColumns(): Observable<TableColumn[]> {
    return new Observable(observer => {
      observer.next([
        {
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
      ]);
    });
  }
}
