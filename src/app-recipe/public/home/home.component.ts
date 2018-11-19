import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { SeoService } from 'shared/seo/shared/seo.service';
import { Recipe } from '../recipe/shared/recipe';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Filter } from 'shared/facet/filter/shared/filter';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('full', [
      state('full', style({
        color: '#4D4C4C',
        borderColor: 'none',
        backgroundColor: '#f4c71d'
      })),
      state('empty', style({
        color: '#4D4C4C',
        border: '1px solid #f4c71d',
        backgroundColor: 'transparent',
        cursor: 'default'
      })),
      transition('full => empty', [
        animate('0.5s')
      ]),
      transition('empty => full', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  mediaBreakpoint: string;
  ingredients: Array<string>;
  form: FormGroup;
  @ViewChild('search') search: ElementRef;
  query: {
    filters: Filter[],
    limit: number
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private observableMedia: ObservableMedia,
              private seoService: SeoService,
              private localizeRouterService: LocalizeRouterService) {
    this.ingredients = [];
    this.seoService.setSeo('home');
    this.query = {
      limit: 5,
      filters: [
        {
          column: 'on_homepage',
          operator: '==',
          value: true
        }
      ]
    };
  }

  scrollPosition(id: string) {
    if (typeof document === 'object' && document) {
      const content = document.querySelector(id);
      if (content) {
        content.scrollTop = 0;
      }
    }
  }

  ngOnInit() {
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
