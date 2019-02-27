import { Observable, of } from 'rxjs';
import { Favorite } from './favorite';
import { mockFavorite, mockFavorites } from './mock-favorite';
import { Product } from '../../product/shared/product';

export class MockFavoriteService {
  getFavoriteProducts(): Observable<Favorite[]> {
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
}
