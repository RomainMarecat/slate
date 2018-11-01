import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Recipe } from '../shared/recipe';
import { RecipeService } from '../shared/recipe.service';
import { AlertService } from 'shared/popup/alert.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipes: Recipe[];
  sizeSubject: Subject<any>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private recipeService: RecipeService) {
    this.sizeSubject = new Subject();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.slug) {
        const slug = params.slug;
        this.recipeService.query$.next({
          filters: [
            {
              column: 'slug',
              operand: '==',
              value: slug
            }
          ],
          limit: 1
        });
        this.recipeService.getRecipes()
          .subscribe((recipes: Recipe[]) => {
            this.recipes = recipes;
          }, () => {
            this.alertService.show('error.api.errors');
            this.recipes = [];
          });
      }
    });
  }

}
