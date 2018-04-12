import { Observable } from 'rxjs/Observable';

export class MockGeocodeService {
  initGeocoder() {
  }

  private waitForMapsToLoad(): Observable<boolean> {
    return Observable.of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    return Observable.of([]);
  }
}
