import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../shared/recipe';
import { RecipeService } from '../shared/recipe.service';
import { AlertService } from 'shared/popup/alert.service';
import { SeoService } from 'shared/seo/shared/seo.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  isLoading: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private recipeService: RecipeService,
              private seoService: SeoService) {
    this.isLoading = true;
    this.seoService.setSeo('recipe-detail');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.slug) {
        const key = params.slug.substring(0, params.slug.indexOf('-'));
        this.recipeService.getRecipe(key)
          .subscribe((recipe: Recipe) => {
            this.recipe = recipe;
            this.isLoading = false;
          }, () => {
            this.alertService.show('error.api.errors');
            this.isLoading = false;
          });
      }
    });
  }

}
