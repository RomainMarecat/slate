import { mockMedia } from './mock-media';
import { Media } from './media';
import { Observable, of } from 'rxjs';

export class MockMediaService {

  getMedia(): Observable<Media> {
    return of(mockMedia);
  }

  filterByPublicId(): Observable<Media[]> {
    return of([mockMedia]);
  }
}
