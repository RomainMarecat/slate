import { Observable } from 'rxjs/Observable';
import { Map } from './map';
import { mockMaps } from './mock-map';

export class MockMapService {
  getMaps(): Observable<Map[]> {
    return Observable.of(mockMaps);
  }
}
