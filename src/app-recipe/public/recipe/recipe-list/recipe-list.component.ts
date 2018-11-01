import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../shared/recipe';
import { Subject } from 'rxjs';
import { RecipeService } from '../shared/recipe.service';
import { AlertService } from 'shared/popup/alert.service';
import { SeoService } from 'shared/seo/shared/seo.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  sizeSubject: Subject<any>;
  isLoading: boolean;

  constructor(private recipeService: RecipeService,
              private alertService: AlertService,
              private seoService: SeoService,
              private router: Router,
              private route: ActivatedRoute) {
    this.sizeSubject = new Subject();
  }

  ngOnInit() {
    this.isLoading;
    true;
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

  navigateToRecipe(slug: string) {
    this.router.navigate(['recipes', slug]);
  }
}
