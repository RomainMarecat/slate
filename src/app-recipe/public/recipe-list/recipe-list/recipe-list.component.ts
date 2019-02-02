import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Recipe } from '../../recipe/shared/recipe';
import { RecipeService } from '../../recipe/shared/recipe.service';
import { AlertService } from '../../../../shared/popup/alert.service';
import { SeoService } from '../../../../shared/seo/shared/seo.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Filter } from '../../../../shared/facet/filter/shared/filter';
import { StringService } from '../../../../shared/util/string.service';

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

  params: string;

  overlayColor: string;

  constructor(private recipeService: RecipeService,
              private alertService: AlertService,
              private seoService: SeoService,
              private router: Router,
              private route: ActivatedRoute,
              private localizeRouterService: LocalizeRouterService) {
    // Route admin observation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/') {
          this.seoService.setSeo('recipe-list');
        }
      }
    });

    this.isLoading = true;
    this.query = {
      limit: 50,
      filters: []
    };
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (typeof params['ingredients'] !== 'undefined') {
        const ingredients: string[] = (params['ingredients'] as string).split(',');

        if (ingredients.length > 0) {
          this.query.filters = ingredients.map((i) => {
            return {
              operator: 'array-contains',
              column: 'search_ingredients',
              value: i
            };
          });
        }
        this.getRecipes();
        this.seoService.setSeo('recipe-list-ingredients', {ingredients: params['ingredients']});
      }
    });

    this.route.queryParams
      .subscribe((params: Params) => {
        if (typeof params['r'] !== 'undefined') {
          this.params = params['r'];
        }

        this.getRecipes();
      });
  }

  getRecipes() {
    if (this.query) {
      this.recipeService.query$.next(this.query);
      this.recipeService.getRecipes()
        .subscribe((recipes: Recipe[]) => {
          this.isLoading = false;
          if (this.params) {
            this.recipes = recipes.filter((r) => StringService.replaceDiacritics(r.name.toLowerCase())
              .includes(StringService.replaceDiacritics(this.params.toLowerCase())));
            return;
          }
          this.recipes = recipes;
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
