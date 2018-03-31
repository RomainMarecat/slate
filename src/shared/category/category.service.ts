import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../firestore/visitor.service';
import { Category } from './category';

@Injectable()
export class CategoryService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CATEGORY') table: string) {
    super(afs, table);
  }

  getCategories(): Observable < Category[] > {
    return super.getDocuments() as Observable < Category[] > ;
  }

  getCategory(key: string): Observable < Category > {
    return super.getDocument(key) as Observable < Category > ;
  }

  createCategory(category: Category): Promise < any > {
    return super.createDocument(category);
  }

  updateCategory(category: Category) {
    return super.updateDocument(category);
  }


  deleteCategory(category: Category) {
    return super.deleteDocument(category);
  }
}
