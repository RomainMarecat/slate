import { mockMedia } from './mock-media';
import { Media } from './media';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/internal/observable/of';

export class MockMediaService {

  getMedia(): Observable<Media> {
    return of(mockMedia);
  }

  filterByPublicId(): Observable<Media[]> {
    return of([mockMedia]);
  }
}
