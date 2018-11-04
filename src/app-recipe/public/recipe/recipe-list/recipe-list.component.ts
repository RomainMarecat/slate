import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../shared/recipe';
import { RecipeService } from '../shared/recipe.service';
import { AlertService } from 'shared/popup/alert.service';
import { SeoService } from 'shared/seo/shared/seo.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Filter } from 'shared/facet/filter/shared/filter';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading: boolean;

  _query: {
    filters: Filter[],
    limit: number
  };

  constructor(private recipeService: RecipeService,
              private alertService: AlertService,
              private seoService: SeoService,
              private router: Router,
              private route: ActivatedRoute,
              private localizeRouterService: LocalizeRouterService) {
    this.seoService.setSeo('recipe-list');
    this.isLoading = true;

    // @todo Bien penser à retirer le MockRecipeService
    this.query = {
      limit: 50,
      filters: []
    };
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (typeof params['ingredients'] !== 'undefined') {
        const ingredients: string = params['ingredients'].split(',');

        if (ingredients.length > 0) {
          this.getRecipes();
        }
      }
    });
  }

  getRecipes() {
    if (this.query) {
      this.recipeService.query$.next(this.query);
      this.recipeService.getRecipes()
        .subscribe((recipes: Recipe[]) => {
          this.recipes = recipes;
          this.isLoading = false;
        }, () => {
          this.alertService.show('error.api.errors');
          this.recipes = [];
          this.isLoading = false;
        });
    }
  }

  navigateTo(recipe: Recipe) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('recipes'),
      `${recipe.key}-${recipe.slug}`
    ]);
  }

  @Input() set query(query) {
    this._query = query;
    this.getRecipes();
  }

  get query() {
    return this._query;
  }
}
