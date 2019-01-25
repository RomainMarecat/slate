import { Inject, Injectable } from '@angular/core';
import { VisitorService } from '../../../../shared/firestore/visitor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_INGREDIENT') table: string) {
    super(afs, table);
  }

  getIngredients(): Observable<Ingredient[]> {
    return super.getDocuments() as Observable<Ingredient[]>;
  }

  getIngredient(key: string): Observable<Ingredient> {
    return super.getDocument(key) as Observable<Ingredient>;
  }

  createIngredient(ingredient: Ingredient): Promise<any> {
    return super.createDocument(ingredient);
  }

  updateIngredient(ingredient: Ingredient) {
    return super.updateDocument(ingredient);
  }

  deleteIngredient(ingredient: Ingredient) {
    return super.deleteDocument(ingredient);
  }
}
