import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_ARTICLE') table: string) {
    super(afs, table);
  }

  getArticles(): Observable<Article[]> {
    return super.getDocuments() as Observable<Article[]>;
  }

  getArticle(key: string): Observable<Article> {
    return super.getDocument(key) as Observable<Article>;
  }

  createArticle(article: Article): Promise<any> {
    return super.createDocument(article);
  }

  updateArticle(article: Article) {
    return super.updateDocument(article);
  }


  deleteArticle(article: Article) {
    return super.deleteDocument(article);
  }
}
