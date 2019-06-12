import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { Favorite } from './favorite';
import { VisitorService } from '../../firestore/visitor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, timeout } from 'rxjs/operators';
import { User } from '../../user/shared/user';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends VisitorService {

  favoriteUserProducts$: BehaviorSubject<Map<string, Favorite>> = new BehaviorSubject(new Map<string, Favorite>());
  favoriteUserProducts: Map<string, Favorite> = new Map<string, Favorite>();

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

  filterFavoritesByNbView(user: User) {
    this.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: user.uid
      },
      {
        column: 'nb_view',
        operator: '>',
        value: 3
      }
    ]);
    this.limit$.next(4);
  }

  getUserFavoritesByNbView(user: User): Observable<Favorite[]> {
    this.filterFavoritesByNbView(user);
    return new Observable((observer) => {
      const subscription: Subscription = this.getFavorites()
        .pipe(
          take(1)
        )
        .subscribe((favorites) => {
          observer.next(favorites.filter((favorite) => {
            return favorite.category && favorite.nb_view > 3;
          }));

          if (subscription) {
            subscription.unsubscribe();
          }
        }, (err) => {
          observer.error(err);
        });
    });
  }

  setFavorite(user: User) {
    this.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: user.uid
      },
    ]);
    const subscription: Subscription = this.getFavorites()
      .subscribe((favorites: Favorite[]) => {
        if (favorites.length > 0) {
          favorites.forEach(favorite => {
            this.favoriteUserProducts.set(favorite.product, favorite);
            this.favoriteUserProducts$.next(this.favoriteUserProducts);
          });
        }

        if (subscription) {
          subscription.unsubscribe();
        }
      });
  }

  onFavoriteUserProductAdded(favorite: Favorite) {
    this.favoriteUserProducts.set(favorite.product, favorite);
    this.favoriteUserProducts$.next(this.favoriteUserProducts);
  }

  onFavoriteUserProductRemoved(favoriteProduct: Favorite) {
    this.favoriteUserProducts.delete(favoriteProduct.product);
    this.favoriteUserProducts$.next(this.favoriteUserProducts);
  }
}
