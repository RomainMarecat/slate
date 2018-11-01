import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../app-recipe/public/recipe/shared/recipe.service';
import { Recipe } from '../../../app-recipe/public/recipe/shared/recipe';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  recipes: Recipe[] = [];
  filteredRecipes: Observable<Recipe[]> = of([]);

  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<SearchComponent>,
              private recipeService: RecipeService,
              private router: Router,
              private localizeService: LocalizeRouterService
  ) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  /**
   * filtre les produits récupérés en fonction de l'entrée utilisateur
   * @param val l'entrée utilisateur
   */
  filter(val: string): Recipe[] {
    return this.recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(val.toLowerCase());
    });
  }

  /**
   * récupère les produits de l'API et envoie les entrées utilisateurs
   * dans la barre de recherche vers le filtre
   */
  getRecipes() {
    this.recipeService.getRecipes().subscribe((recipes) => {
      if (recipes) {
        this.recipes = recipes;
        this.filteredRecipes = this.form.controls.search.valueChanges
          .pipe(map(val => this.filter(val)));
      }
    }, (e) => {
      this.recipes = [];
      this.filteredRecipes = of([]);
    });
  }

  /**
   * envoie les produits filtrés à la page de résultats et navigue vers elle
   */
  getResults() {
    this.router.navigate([this.localizeService.translateRoute('/search')]);
    this.dialogRef.close();
  }

  /**
   * permet de naviguer vers la page detail
   * du produit choisi par l'utilisateur
   * et de fermer la modale
   * @param id id du produit à voir
   */
  seeDocument(id: number) {
    this.router.navigate([this.localizeService.translateRoute(`/recipes/${id}`)]).then((b) => {
      if (b) {
        this.dialogRef.close();
      }
    });
  }
}
