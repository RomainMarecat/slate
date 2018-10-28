import { Observable, of } from 'rxjs';
import { Map } from './map';
import { mockMaps } from './mock-map';

export class MockMapService {
  getMaps(): Observable<Map[]> {
    return of(mockMaps);
  }
}
