import { BehaviorSubject, Observable, of } from 'rxjs';
import { Favorite } from './favorite';
import { mockFavorite, mockFavorites } from './mock-favorite';
import { Product } from '../../product/shared/product';
import { User } from '../../user/shared/user';

export class MockFavoriteService {

  favoriteUserProducts$: BehaviorSubject<Map<string, Favorite>> = new BehaviorSubject(new Map<string, Favorite>());
  favoriteUserProducts: Map<string, Favorite> = new Map<string, Favorite>();

  getFavorites(): Observable<Favorite[]> {
    return of(mockFavorites);
  }

  getFavorite(id: number): Observable<Favorite> {
    return of(mockFavorite);
  }

  addFavorite(product: Product): Observable<Favorite> {
    return of(mockFavorite);
  }

  removeFavorite(favoriteProduct: Favorite): Observable<void> {
    return of();
  }

  getUserFavoritesByNbView(user: User): Observable<Favorite[]> {
    return this.getFavorites();
  }

  setFavorite(user: User) {
    this.favoriteUserProducts.set(mockFavorite.product, mockFavorite);
    this.favoriteUserProducts$.next(this.favoriteUserProducts);
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
