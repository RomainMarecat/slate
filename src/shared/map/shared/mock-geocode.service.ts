import { Observable, of } from 'rxjs';

export class MockGeocodeService {
  initGeocoder() {
  }

  private waitForMapsToLoad(): Observable<boolean> {
    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    return of([]);
  }
}
