import { mockMedia } from './mock-media';
import { Media } from './media';
import { Observable } from 'rxjs/Observable';

export class MockMediaService {

  getMedia(): Observable < Media > {
    return Observable.of(mockMedia);
  }

  filterByPublicId(): Observable < Media[] > {
    return Observable.of([mockMedia]);
  }
}
