import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { SeoService } from 'shared/seo/shared/seo.service';
import { RecipeService } from '../recipe/shared/recipe.service';
import { Recipe } from '../recipe/shared/recipe';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[];
  mediaBreakpoint: string;
  ingredients: Array<string>;
  form: FormGroup;
  @ViewChild('search') search: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private observableMedia: ObservableMedia,
              private seoService: SeoService,
              private recipeService: RecipeService,
              private localizeRouterService: LocalizeRouterService) {
    this.ingredients = [];
    this.seoService.setSeo('home');
  }

  scrollPosition(id: string) {
    if (typeof document === 'object' && document) {
      const content = document.querySelector(id);
      if (content) {
        console.log(content);
        content.scrollTop = 0;
      }
    }
  }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes) => this.recipes = recipes);
    this.form = this.formBuilder.group({
      ingredient: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]]
    });

    this.observableMedia
      .subscribe((mediaChange: MediaChange) => {
        this.mediaBreakpoint = mediaChange.mqAlias;
      });
  }

  addIngredient() {
    if (this.form.valid) {
      this.ingredients.push(this.form.value.ingredient);
      this.search.nativeElement.value = '';
    }
  }

  removeIngredient(ingredient: string) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }

  searchRecipe() {
    if (this.ingredients.length > 0) {
      this.router.navigate([
        this.localizeRouterService.translateRoute('recipes'),
        'ingredients',
        this.ingredients.join(',')]);
    } else {
      this.router.navigate([
        this.localizeRouterService.translateRoute('recipes'),
      ]);
    }
  }

  navigateTo(recipe: Recipe) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('recipes'),
      `${recipe.key}-${recipe.slug}`
    ]);
  }
}
