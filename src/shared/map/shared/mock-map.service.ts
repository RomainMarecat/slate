import { Observable } from 'rxjs/Observable';
import { Map } from './map';
import { mockMaps } from './mock-map';
import { of } from 'rxjs/internal/observable/of';

export class MockMapService {
  getMaps(): Observable<Map[]> {
    return of(mockMaps);
  }
}
