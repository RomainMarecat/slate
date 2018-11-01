import { Inject, Injectable } from '@angular/core';
import { VisitorService } from 'shared/firestore/visitor.service';
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
