import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/internal/observable/of';

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
