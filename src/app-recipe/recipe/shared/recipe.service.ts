import { Inject, Injectable } from '@angular/core';
import { VisitorService } from '../../../shared/firestore/visitor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_RECIPE') table: string) {
    super(afs, table);
  }

  /**
   * Get detail schema from recipe data
   */
  getDetailSchema(recipe: Recipe): Object {
    return {
      '@context': 'http://schema.org/',
      '@type': 'Recipe',
      'name': recipe.name,
      'author': recipe.creator,
      'image': recipe.image,
      'recipeType': recipe.cuisine_type,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': recipe.rating.toString(10)
      },
      'cookTime':
        `PT${recipe.cook_time.substr(0, recipe.cook_time.indexOf(':'))}H${recipe
          .cook_time.substr(recipe.cook_time.indexOf(':'))}M`,
      'prepTime':
        `PT${recipe.prep_time.substr(0, recipe.prep_time.indexOf(':'))}H${recipe
          .prep_time.substr(recipe.prep_time.indexOf(':'))}M`,
      'totalTime':
        `PT${recipe.total_time.substr(0, recipe.total_time.indexOf(':'))}H${recipe
          .total_time.substr(recipe.total_time.indexOf(':'))}M`,
      'recipeYield': recipe.yield.toString(10),
      'recipeIngredient': recipe.ingredients.map(ingredient => ingredient.name),
      'recipeInstructions': recipe.instructions.map(instruction => instruction.sentence)
    };
  }

  getRecipes(): Observable<Recipe[]> {
    return super.getDocuments() as Observable<Recipe[]>;
  }

  getRecipe(key: string): Observable<Recipe> {
    return super.getDocument(key) as Observable<Recipe>;
  }

  createRecipe(article: Recipe): Promise<any> {
    return super.createDocument(article);
  }

  updateRecipe(article: Recipe) {
    return super.updateDocument(article);
  }


  deleteRecipe(article: Recipe) {
    return super.deleteDocument(article);
  }
}
