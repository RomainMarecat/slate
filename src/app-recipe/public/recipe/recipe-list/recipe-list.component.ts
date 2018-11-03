import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../shared/recipe';
import { RecipeService } from '../shared/recipe.service';
import { AlertService } from 'shared/popup/alert.service';
import { SeoService } from 'shared/seo/shared/seo.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading: boolean;

  constructor(private recipeService: RecipeService,
              private alertService: AlertService,
              private seoService: SeoService,
              private router: Router,
              private route: ActivatedRoute,
              private localizeRouterService: LocalizeRouterService) {
    this.seoService.setSeo('recipe-list');
    this.isLoading = true;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (typeof params['ingredients'] !== 'undefined') {
        const ingredients: string = params['ingredients'].split(',');
      }

      this.recipeService.query$.next({
        limit: 100
      });
      this.recipeService.getRecipes()
        .subscribe((recipes: Recipe[]) => {
          this.recipes = recipes;
          this.isLoading = false;
        }, () => {
          this.alertService.show('error.api.errors');
          this.recipes = [];
          this.isLoading = false;
        });
    });
  }

  navigateTo(recipe: Recipe) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('recipes'),
      `${recipe.key}-${recipe.slug}`
    ]);
  }
}
