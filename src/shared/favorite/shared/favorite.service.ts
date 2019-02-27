import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from './favorite';
import { VisitorService } from '../../firestore/visitor.service';
import { AngularFirestore } from '@angular/fire/firestore';

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

  createFavorite(favorite: Favorite): Promise<any> {
    return super.createDocument(favorite);
  }

  updateFavorite(favorite: Favorite) {
    return super.updateDocument(favorite);
  }

  deleteFavorite(favorite: Favorite): Promise<void> {
    return super.deleteDocument(favorite);
  }
}
