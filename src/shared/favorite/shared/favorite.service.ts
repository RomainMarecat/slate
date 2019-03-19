import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Favorite } from './favorite';
import { VisitorService } from '../../firestore/visitor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends VisitorService {
  constructor(afs: AngularFirestore, @Inject('TABLE_FAVORITE') table: string) {
    super(afs, table);
  }

  getFavorites(): Observable<Favorite[]> {
    return super.getDocuments() as Observable<Favorite[]>;
  }

  getFavorite(key: string): Observable<Favorite> {
    return super.getDocument(key) as Observable<Favorite>;
  }

  createFavorite(favorite: Favorite): Observable<any> {
    return from(super.createDocument(favorite))
      .pipe(
        timeout(5000)
      );
  }

  updateFavorite(favorite: Favorite): Observable<void> {
    return from(super.updateDocument(favorite))
      .pipe(
        timeout(5000),
      );
  }

  deleteFavorite(favorite: Favorite): Promise<void> {
    return super.deleteDocument(favorite);
  }
}
