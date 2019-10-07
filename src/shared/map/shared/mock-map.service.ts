import { isPlatformBrowser } from '@angular/common';
import { Map as LeafletMap } from 'leaflet';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Map } from './map';
import { mockMaps } from './mock-map';

export class MockMapService {

  map$: BehaviorSubject<LeafletMap> = new BehaviorSubject<LeafletMap>(null);

  getMaps(): Observable<Map[]> {
    return of(mockMaps);
  }

  onMapReady(map: LeafletMap) {
    this.map$.next(null);
  }

  getLeafletMap(): Observable<LeafletMap> {
    return this.map$.asObservable()
      .pipe(
        skipWhile((map) => !map)
      );
  }

}
