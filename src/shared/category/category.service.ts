import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../firestore/visitor.service';
import { Category } from './category';

@Injectable()
export class CategoryService extends VisitorService {

  static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor(afs: AngularFirestore, @Inject('TABLE_CATEGORY') table: string) {
    super(afs, table);
  }

  getCategories(): Observable<Category[]> {
    return super.getDocuments() as Observable<Category[]>;
  }

  getCategory(key: string): Observable<Category> {
    return super.getDocument(key) as Observable<Category>;
  }

  createCategory(category: Category): Promise<any> {
    return super.createDocument(category);
  }

  updateCategory(category: Category) {
    return super.updateDocument(category);
  }


  deleteCategory(category: Category) {
    return super.deleteDocument(category);
  }

  getPublishedCategories(): Observable<Category[]> {
    return new Observable((observer) => {
      this.filters$.next([
        {
          column: 'published',
          operator: '==',
          value: true
        }
      ]);
      this.limit$.next(10);
      this.getCategories()
        .subscribe((categories: Category[]) => {
          observer.next(categories.map((category: Category) => {
            category.metadata = {
              size: CategoryService.randomIntFromInterval(25, 40)
            };
            return category;
          }));
        }, (err) => {
          observer.error(err);
        });
    });
  }
}
